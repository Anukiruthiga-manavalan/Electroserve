import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-electrician-register',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './electrician-register.html',
    styleUrl: './electrician-register.scss'
})
export class ElectricianRegister {
    step = signal(1);
    submitted = signal(false);

    name = ''; phone = ''; email = ''; password = '';
    experience = ''; license = ''; about = '';
    selectedCerts: string[] = [];
    selectedServices: string[] = [];
    hourlyRate = ''; location = ''; serviceRadius = '';

    certOptions = ['ITI Electrical', 'Licensed Contractor', 'TNELB Certified', 'Solar PV Installation', 'Smart Home Certified', 'Industrial Electrician'];
    serviceOptions = ['House Wiring', 'Repairs & Fixes', 'EB Services', 'Fan & Light', 'AC Installation', 'Solar & Inverter', 'Smart Home', 'Emergency', 'CCTV & Security', 'Commercial'];

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
