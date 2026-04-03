import { Injectable, signal, inject } from '@angular/core';
import { Booking, ServiceRequest } from '../models/interfaces';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private api = inject(ApiService);

    currentBooking = signal<Partial<Booking>>({});
    bookingStep = signal<number>(1);

    updateBooking(data: Partial<Booking>) {
        this.currentBooking.update(current => ({ ...current, ...data }));
    }

    nextStep() {
        this.bookingStep.update(s => Math.min(s + 1, 4));
    }

    prevStep() {
        this.bookingStep.update(s => Math.max(s - 1, 1));
    }

    setStep(step: number) {
        this.bookingStep.set(step);
    }

    resetBooking() {
        this.currentBooking.set({});
        this.bookingStep.set(1);
    }

    submitBooking(bookingData: Partial<Booking>): Observable<ServiceRequest> {
        const payload = {
            electricianId: bookingData.electricianId,
            serviceType: bookingData.serviceType,
            problemDescription: bookingData.issueDescription,
            requestDate: bookingData.date,
            address: bookingData.address,
            phone: bookingData.phone,
            customerName: bookingData.name,
            timeSlot: bookingData.timeSlot
        };
        return this.api.post<ServiceRequest>('/service-requests', payload);
    }

    getTimeSlots(): string[] {
        return [
            '08:00 AM – 09:00 AM',
            '09:00 AM – 10:00 AM',
            '10:00 AM – 11:00 AM',
            '11:00 AM – 12:00 PM',
            '12:00 PM – 01:00 PM',
            '02:00 PM – 03:00 PM',
            '03:00 PM – 04:00 PM',
            '04:00 PM – 05:00 PM',
            '05:00 PM – 06:00 PM',
            '06:00 PM – 07:00 PM'
        ];
    }
}
