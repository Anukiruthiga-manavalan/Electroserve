import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'find-electricians',
        loadComponent: () => import('./pages/find-electricians/find-electricians').then(m => m.FindElectricians)
    },
    {
        path: 'electrician/:id',
        loadComponent: () => import('./pages/electrician-detail/electrician-detail').then(m => m.ElectricianDetail)
    },
    {
        path: 'booking/:id',
        loadComponent: () => import('./pages/booking/booking').then(m => m.BookingPage)
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then(m => m.Services)
    },
    {
        path: 'electrician-register',
        loadComponent: () => import('./pages/electrician-register/electrician-register').then(m => m.ElectricianRegister)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
