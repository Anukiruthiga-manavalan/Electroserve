import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ElectricianService } from '../../services/electrician.service';
import { Electrician } from '../../models/interfaces';

@Component({
    selector: 'app-find-electricians',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './find-electricians.html',
    styleUrl: './find-electricians.scss'
})
export class FindElectricians implements OnInit {
    private electricianService = inject(ElectricianService);

    electricians = signal<Electrician[]>([]);
    searchQuery = '';
    selectedSpecialty = '';
    minRating = 0;
    maxRate = 1000;
    availableOnly = false;
    sortBy = 'rating';

    specialties = ['House Wiring', 'EB Meter', 'Repairs', 'AC Wiring', 'Solar Panel', 'Smart Home', 'CCTV', 'Emergency', 'Commercial', 'Industrial'];

    ngOnInit() {
        this.fetchElectricians();
    }

    fetchElectricians() {
        this.electricianService.searchElectricians(this.searchQuery).subscribe(data => {
            let results = data;

            if (this.selectedSpecialty) {
                results = results.filter(e =>
                    e.specialization && e.specialization.toLowerCase().includes(this.selectedSpecialty.toLowerCase())
                );
            }
            if (this.minRating) {
                results = results.filter(e => e.rating >= this.minRating);
            }
            if (this.maxRate < 1000) {
                results = results.filter(e => e.hourlyRate <= this.maxRate);
            }
            if (this.availableOnly) {
                results = results.filter(e => e.availabilityStatus === 'Available');
            }

            if (this.sortBy === 'rating') {
                results.sort((a, b) => b.rating - a.rating);
            } else if (this.sortBy === 'price-low') {
                results.sort((a, b) => a.hourlyRate - b.hourlyRate);
            } else if (this.sortBy === 'price-high') {
                results.sort((a, b) => b.hourlyRate - a.hourlyRate);
            } else if (this.sortBy === 'experience') {
                results.sort((a, b) => (b.experienceYears || 0) - (a.experienceYears || 0));
            }

            this.electricians.set(results);
        });
    }

    search() {
        this.fetchElectricians();
    }

    clearFilters() {
        this.searchQuery = '';
        this.selectedSpecialty = '';
        this.minRating = 0;
        this.maxRate = 1000;
        this.availableOnly = false;
        this.sortBy = 'rating';
        this.fetchElectricians();
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
