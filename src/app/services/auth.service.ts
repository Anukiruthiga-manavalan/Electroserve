import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { AuthResponse } from '../models/interfaces';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);

    currentUser = signal<AuthResponse | null>(this.loadUserFromStorage());

    private loadUserFromStorage(): AuthResponse | null {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    }

    login(credentials: any) {
        return this.api.post<AuthResponse>('/auth/login', credentials).pipe(
            tap(res => this.handleAuth(res))
        );
    }

    register(data: any) {
        return this.api.post<AuthResponse>('/auth/register', data).pipe(
            tap(res => this.handleAuth(res))
        );
    }

    private handleAuth(res: AuthResponse) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUser.set(res);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getRole(): string | null {
        return this.currentUser()?.role || null;
    }
}
