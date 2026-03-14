import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElectricianService } from '../../services/electrician.service';
import { Electrician, ServiceCategory } from '../../models/interfaces';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home implements OnInit {
    private electricianService = inject(ElectricianService);

    featuredElectricians = signal<Electrician[]>([]);
    services = signal<ServiceCategory[]>([]);
    searchLocation = signal('');
    searchService = signal('');

    stats = [
        { value: 500, suffix: '+', label: 'Verified Electricians' },
        { value: 10000, suffix: '+', label: 'Bookings Completed' },
        { value: 4.8, suffix: '★', label: 'Average Rating' },
        { value: 50, suffix: '+', label: 'Cities Covered' }
    ];

    testimonials = [
        { name: 'Aravind S.', location: 'Anna Nagar, Chennai', rating: 5, comment: 'Found an amazing electrician within 10 minutes of searching. He came on time and fixed our wiring issue perfectly. Highly recommend ElectroServe!', avatar: '' },
        { name: 'Deepika R.', location: 'T. Nagar, Chennai', rating: 5, comment: 'Got our entire home rewired through ElectroServe. The electrician was professional, clean work, and very reasonable pricing. Will use again!', avatar: '' },
        { name: 'Prakash M.', location: 'Velachery, Chennai', rating: 4, comment: 'Emergency service at midnight — the electrician arrived in 25 minutes. Fixed the power outage quickly. Great service for emergencies!', avatar: '' }
    ];

    steps = [
        { icon: 'search', title: 'Search', description: 'Enter your location and the type of electrical service you need.' },
        { icon: 'person_search', title: 'Choose', description: 'Browse verified electricians, compare ratings, reviews, and pricing.' },
        { icon: 'event_available', title: 'Book', description: 'Pick a convenient time slot and confirm your booking instantly.' }
    ];

    ngOnInit() {
        this.electricianService.getElectricians().subscribe(data => {
            this.featuredElectricians.set(data.slice(0, 4));
        });
        this.electricianService.getServiceCategories().subscribe(data => {
            this.services.set(data);
        });
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
