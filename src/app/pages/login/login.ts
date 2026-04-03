import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  role: 'customer' | 'electrician' = 'customer';
  isLoading = signal(false);
  errorMessage = signal('');
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  onSubmit() {
    if (!this.email || !this.password) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toast.show('Successfully logged in!', 'success');
        this.router.navigate(['/']); // Redirect to home on success
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.error || 'Login failed. Please check your credentials.';
        this.errorMessage.set(errorMsg);
        this.toast.show(errorMsg, 'error');
      }
    });
  }
}
