import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElectricianService } from '../../services/electrician.service';
import { ServiceCategory } from '../../models/interfaces';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './services.html',
    styleUrl: './services.scss'
})
export class Services implements OnInit {
    private electricianService = inject(ElectricianService);
    services = signal<ServiceCategory[]>([]);

    ngOnInit() {
        this.electricianService.getServiceCategories().subscribe(data => {
  this.services.set(data);
});
    }
}
