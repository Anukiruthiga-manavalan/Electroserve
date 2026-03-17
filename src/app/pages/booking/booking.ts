import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { ElectricianService } from '../../services/electrician.service';
import { ToastService } from '../../services/toast.service';
import { Electrician } from '../../models/interfaces';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './booking.html',
    styleUrl: './booking.scss'
})
export class BookingPage implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private bookingService = inject(BookingService);
    private electricianService = inject(ElectricianService);
    authService = inject(AuthService);
    private toastService = inject(ToastService);

    electrician = signal<Electrician | null>(null);
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
            this.toastService.show('Please log in to book an electrician.', 'info');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
            return;
        }
        this.bookingService.resetBooking();
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.electricianService.getElectricianById(id).subscribe({
            next: elec => this.electrician.set(elec),
            error: err => console.error(err)
        });
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
        const elec = this.electrician();
        if (!elec) return;

        const bookingData = {
            electricianId: elec.electricianId,
            serviceType: this.serviceType,
            issueDescription: this.issueDescription,
            date: this.selectedDate,
            timeSlot: this.selectedTime,
            address: this.address,
            city: this.city,
            phone: this.phone,
            name: this.customerName
        };

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
