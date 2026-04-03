import { Injectable, inject } from '@angular/core';
import { Electrician, ServiceCategory } from '../models/interfaces';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ElectricianService {
    private api = inject(ApiService);

    // Keep service categories frontend-only as requested by design
    private serviceCategories: ServiceCategory[] = [
        { id: 1, name: 'House Wiring', icon: 'electrical_services', description: 'Complete house wiring for new construction and rewiring of existing homes.', startingPrice: '₹2,500', image: '' },
        { id: 2, name: 'Repairs & Fixes', icon: 'build', description: 'Switch, socket, MCB repairs, short circuit fixing and troubleshooting.', startingPrice: '₹150', image: '' },
        { id: 3, name: 'EB Services', icon: 'electric_meter', description: 'New EB connection, meter installation, load enhancement, name transfer.', startingPrice: '₹1,500', image: '' },
        { id: 4, name: 'Fan & Light', icon: 'light', description: 'Ceiling fan, decorative lights, chandelier, and LED installation.', startingPrice: '₹200', image: '' },
        { id: 5, name: 'AC Installation', icon: 'ac_unit', description: 'Split AC, window AC wiring and dedicated circuit installation.', startingPrice: '₹1,200', image: '' },
        { id: 6, name: 'Solar & Inverter', icon: 'solar_power', description: 'Rooftop solar panels, inverter, battery backup setup and maintenance.', startingPrice: '₹2,000', image: '' },
        { id: 7, name: 'Smart Home', icon: 'smart_toy', description: 'Home automation, smart switches, IoT device wiring and setup.', startingPrice: '₹5,000', image: '' },
        { id: 8, name: 'Emergency 24/7', icon: 'emergency', description: 'Round-the-clock emergency electrical repair and rescue service.', startingPrice: '₹500', image: '' }
    ];

    getElectricians(): Observable<Electrician[]> {
        return this.api.get<Electrician[]>('/electricians');
    }

    getElectricianById(id: number): Observable<Electrician> {
        return this.api.get<Electrician>(`/electricians/${id}`);
    }

    getServiceCategories(): Observable<ServiceCategory[]> {
        return of(this.serviceCategories);
    }

    searchElectricians(query: string): Observable<Electrician[]> {
        if (!query) {
            return this.getElectricians();
        }
        return this.api.get<Electrician[]>(`/electricians?search=${encodeURIComponent(query)}`);
    }

    updateAvailability(id: number, status: string): Observable<Electrician> {
        return this.api.put<Electrician>(`/electricians/${id}/availability`, { status });
    }
}
