import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Chatbot } from './components/chatbot/chatbot';
import { ToastComponent } from './components/toast/toast';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Chatbot, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }
