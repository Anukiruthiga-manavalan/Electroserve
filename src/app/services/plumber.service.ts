import { Injectable, inject } from '@angular/core';
import { Plumber, ServiceCategory } from '../models/interfaces';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlumberService {
    private api = inject(ApiService);

    private serviceCategories: ServiceCategory[] = [
        { id: 101, name: 'Pipe Repair', icon: 'plumbing', description: 'Fix leaking, burst or damaged pipes for residential and commercial buildings.', startingPrice: '₹300', image: '', type: 'plumbing' },
        { id: 102, name: 'Leak Detection', icon: 'water_drop', description: 'Professional leak detection and waterproofing services.', startingPrice: '₹500', image: '', type: 'plumbing' },
        { id: 103, name: 'Bathroom Fitting', icon: 'bathroom', description: 'Complete bathroom installation, renovation and fixture fitting.', startingPrice: '₹2,000', image: '', type: 'plumbing' },
        { id: 104, name: 'Kitchen Plumbing', icon: 'kitchen', description: 'Sink installation, dishwasher connection, garbage disposal setup.', startingPrice: '₹800', image: '', type: 'plumbing' },
        { id: 105, name: 'Water Heater', icon: 'hot_tub', description: 'Geyser and water heater installation, repair and maintenance.', startingPrice: '₹1,000', image: '', type: 'plumbing' },
        { id: 106, name: 'Drainage & Sewer', icon: 'waves', description: 'Drain cleaning, sewer line repair, and clog removal services.', startingPrice: '₹400', image: '', type: 'plumbing' },
        { id: 107, name: 'Water Tank', icon: 'water', description: 'Overhead and underground water tank installation and cleaning.', startingPrice: '₹1,500', image: '', type: 'plumbing' },
        { id: 108, name: 'Emergency 24/7', icon: 'emergency', description: 'Round-the-clock emergency plumbing repair and rescue service.', startingPrice: '₹600', image: '', type: 'plumbing' }
    ];

    getPlumbers(): Observable<Plumber[]> {
        return this.api.get<Plumber[]>('/plumbers');
    }

    getPlumberById(id: number): Observable<Plumber> {
        return this.api.get<Plumber>(`/plumbers/${id}`);
    }

    getServiceCategories(): Observable<ServiceCategory[]> {
        return of(this.serviceCategories);
    }

    searchPlumbers(query: string): Observable<Plumber[]> {
        if (!query) {
            return this.getPlumbers();
        }
        return this.api.get<Plumber[]>(`/plumbers?search=${encodeURIComponent(query)}`);
    }
}
