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
  resetEmail = '';
  role: 'customer' | 'electrician' | 'plumber' = 'customer';
  isLoading = signal(false);
  errorMessage = signal('');
  showForgotModal = signal(false);
  resetSent = signal(false);
  
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

  onForgotPassword(event: Event) {
    event.preventDefault();
    this.resetEmail = this.email || '';
    this.resetSent.set(false);
    this.showForgotModal.set(true);
  }

  closeForgotModal() {
    this.showForgotModal.set(false);
    this.resetSent.set(false);
    this.resetEmail = '';
  }

  sendResetLink() {
    if (!this.resetEmail) return;
    // Simulate sending reset link - in production, call backend API
    this.toast.show('Password reset link sent to ' + this.resetEmail, 'success');
    this.resetSent.set(true);
  }

  signInWithGoogle() {
    this.toast.show('Google Sign-In integration coming soon!', 'info');
    // In production, integrate with Google OAuth2
    // window.location.href = '/api/oauth2/authorize/google';
  }

  signInWithFacebook() {
    this.toast.show('Facebook Sign-In integration coming soon!', 'info');
    // In production, integrate with Facebook OAuth2
    // window.location.href = '/api/oauth2/authorize/facebook';
  }
}
