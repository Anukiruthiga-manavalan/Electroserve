import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlumberService } from '../../services/plumber.service';
import { Plumber } from '../../models/interfaces';

@Component({
    selector: 'app-plumber-detail',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './plumber-detail.html',
    styleUrl: './plumber-detail.scss'
})
export class PlumberDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private plumberService = inject(PlumberService);

    plumber = signal<Plumber | null>(null);

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.plumberService.getPlumberById(id).subscribe({
            next: p => {
                if (p && typeof p.certifications === 'string') {
                    // @ts-ignore - transforming for template usage
                    p.certifications = p.certifications ? p.certifications.split(',').map((s: string) => s.trim()) : [];
                }
                this.plumber.set(p);
            },
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
