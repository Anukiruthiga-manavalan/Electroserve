import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Chatbot } from './components/chatbot/chatbot';
import { ToastComponent } from './components/toast/toast';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Chatbot, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  authService = inject(AuthService);
  private router = inject(Router);

  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register';
  }

  showLayout(): boolean {
    return this.authService.isLoggedIn() && !this.isAuthPage();
  }
}
