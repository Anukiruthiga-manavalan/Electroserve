import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ElectricianService } from '../../services/electrician.service';
import { Electrician } from '../../models/interfaces';

@Component({
    selector: 'app-electrician-detail',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './electrician-detail.html',
    styleUrl: './electrician-detail.scss'
})
export class ElectricianDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private electricianService = inject(ElectricianService);

    electrician = signal<Electrician | null>(null);

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.electricianService.getElectricianById(id).subscribe({
            next: elec => this.electrician.set(elec),
            error: err => console.error(err)
        });
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
