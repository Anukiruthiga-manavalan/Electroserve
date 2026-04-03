import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlumberService } from '../../services/plumber.service';
import { Plumber } from '../../models/interfaces';

@Component({
    selector: 'app-find-plumbers',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './find-plumbers.html',
    styleUrl: './find-plumbers.scss'
})
export class FindPlumbers implements OnInit {
    private plumberService = inject(PlumberService);

    plumbers = signal<Plumber[]>([]);
    searchQuery = '';
    selectedSpecialty = '';
    minRating = 0;
    maxRate = 1000;
    availableOnly = false;
    sortBy = 'rating';

    specialties = ['Pipe Repair', 'Leak Detection', 'Bathroom Fitting', 'Kitchen Plumbing', 'Water Heater', 'Drainage', 'Water Tank', 'Emergency', 'Commercial', 'Industrial'];

    ngOnInit() {
        this.fetchPlumbers();
    }

    fetchPlumbers() {
        this.plumberService.searchPlumbers(this.searchQuery).subscribe(data => {
            let results = data;

            if (this.selectedSpecialty) {
                results = results.filter(p =>
                    p.specialization && p.specialization.toLowerCase().includes(this.selectedSpecialty.toLowerCase())
                );
            }
            if (this.minRating) {
                results = results.filter(p => p.rating >= this.minRating);
            }
            if (this.maxRate < 1000) {
                results = results.filter(p => p.hourlyRate <= this.maxRate);
            }
            if (this.availableOnly) {
                results = results.filter(p => p.availabilityStatus === 'Available');
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

            this.plumbers.set(results);
        });
    }

    search() {
        this.fetchPlumbers();
    }

    clearFilters() {
        this.searchQuery = '';
        this.selectedSpecialty = '';
        this.minRating = 0;
        this.maxRate = 1000;
        this.availableOnly = false;
        this.sortBy = 'rating';
        this.fetchPlumbers();
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
