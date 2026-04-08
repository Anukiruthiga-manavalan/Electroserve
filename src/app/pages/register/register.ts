import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  name = '';
  email = '';
  phone = '';
  password = '';
  role: 'customer' | 'electrician' | 'plumber' = 'customer';
  isLoading = signal(false);
  errorMessage = signal('');
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  onSubmit() {
    if (!this.name || !this.email || !this.password || !this.phone) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toast.show('Account created successfully!', 'success');
        this.router.navigate(['/']); // Redirect to home on success
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.error || 'Registration failed.';
        this.errorMessage.set(errorMsg);
        this.toast.show(errorMsg, 'error');
      }
    });
  }
}
