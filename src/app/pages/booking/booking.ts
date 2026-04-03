import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { ElectricianService } from '../../services/electrician.service';
import { PlumberService } from '../../services/plumber.service';
import { ToastService } from '../../services/toast.service';
import { Electrician, Plumber } from '../../models/interfaces';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [RouterLink, FormsModule, LowerCasePipe],
    templateUrl: './booking.html',
    styleUrl: './booking.scss'
})
export class BookingPage implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private bookingService = inject(BookingService);
    private electricianService = inject(ElectricianService);
    private plumberService = inject(PlumberService);
    authService = inject(AuthService);
    private toastService = inject(ToastService);

    provider = signal<Electrician | Plumber | null>(null);
    providerType = signal<string>('electrician');
    step = this.bookingService.bookingStep;
    booking = this.bookingService.currentBooking;
    timeSlots = this.bookingService.getTimeSlots();
    submitted = signal(false);

    serviceType = '';
    issueDescription = '';
    selectedDate = '';
    selectedTime = '';
    address = '';
    city = '';
    phone = '';
    customerName = '';

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.toastService.show('Please log in to book a service.', 'info');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
            return;
        }
        this.bookingService.resetBooking();

        // Determine provider type from route data or URL
        const routeData = this.route.snapshot.data;
        const url = this.router.url;
        const isPlumber = routeData['providerType'] === 'plumber' || url.includes('/booking/plumber/');
        this.providerType.set(isPlumber ? 'plumber' : 'electrician');

        const id = Number(this.route.snapshot.paramMap.get('id'));

        if (isPlumber) {
            this.plumberService.getPlumberById(id).subscribe({
                next: p => this.provider.set(p),
                error: err => console.error(err)
            });
        } else {
            this.electricianService.getElectricianById(id).subscribe({
                next: elec => this.provider.set(elec),
                error: err => console.error(err)
            });
        }
    }

    get providerName(): string {
        const p = this.provider();
        return p ? p.name : '';
    }

    get providerId(): number {
        const p = this.provider();
        if (!p) return 0;
        return this.providerType() === 'plumber'
            ? (p as Plumber).plumberId
            : (p as Electrician).electricianId;
    }

    get providerLabel(): string {
        return this.providerType() === 'plumber' ? 'Plumber' : 'Electrician';
    }

    nextStep() {
        this.bookingService.updateBooking({
            serviceType: this.serviceType,
            issueDescription: this.issueDescription,
            date: this.selectedDate,
            timeSlot: this.selectedTime,
            address: this.address,
            city: this.city,
            phone: this.phone,
            name: this.customerName
        });
        this.bookingService.nextStep();
    }

    prevStep() { this.bookingService.prevStep(); }

    submitBooking() {
        const p = this.provider();
        if (!p) return;

        const bookingData: any = {
            serviceType: this.serviceType,
            issueDescription: this.issueDescription,
            date: this.selectedDate,
            timeSlot: this.selectedTime,
            address: this.address,
            city: this.city,
            phone: this.phone,
            name: this.customerName,
            providerType: this.providerType()
        };

        if (this.providerType() === 'plumber') {
            bookingData.plumberId = (p as Plumber).plumberId;
        } else {
            bookingData.electricianId = (p as Electrician).electricianId;
        }

        this.bookingService.submitBooking(bookingData).subscribe({
            next: () => {
                this.toastService.show('Booking confirmed successfully!', 'success');
                this.submitted.set(true);
            },
            error: err => {
                console.error(err);
                this.toastService.show('Failed to submit booking. Please try again.', 'error');
            }
        });
    }

    selectTime(time: string) { this.selectedTime = time; }

    getMinDate(): string {
        const d = new Date();
        return d.toISOString().split('T')[0];
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
