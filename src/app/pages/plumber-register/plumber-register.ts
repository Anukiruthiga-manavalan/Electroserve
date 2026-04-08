import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-plumber-register',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './plumber-register.html',
    styleUrl: './plumber-register.scss'
})
export class PlumberRegister {
    step = signal(1);
    submitted = signal(false);

    name = ''; phone = ''; email = ''; password = '';
    experience = ''; license = ''; about = '';
    selectedCerts: string[] = [];
    selectedServices: string[] = [];
    hourlyRate = ''; location = ''; serviceRadius = '';

    certOptions = ['Licensed Plumber', 'Drainage Specialist', 'Gas Fitting Certified', 'Bathroom Renovation', 'Water Heater Certified', 'Industrial Plumbing'];
    serviceOptions = ['Pipe Repair', 'Leak Detection', 'Bathroom Fitting', 'Drainage & Sewer', 'Water Heater', 'Kitchen Plumbing', 'Water Tank', 'Emergency Plumbing', 'Gas Line', 'Commercial Plumbing'];

    nextStep() { this.step.update(s => Math.min(s + 1, 4)); }
    prevStep() { this.step.update(s => Math.max(s - 1, 1)); }

    toggleCert(cert: string) {
        const i = this.selectedCerts.indexOf(cert);
        if (i >= 0) this.selectedCerts.splice(i, 1);
        else this.selectedCerts.push(cert);
    }

    toggleService(service: string) {
        const i = this.selectedServices.indexOf(service);
        if (i >= 0) this.selectedServices.splice(i, 1);
        else this.selectedServices.push(service);
    }

    submit() { this.submitted.set(true); }
}
