import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        canActivate: [authGuard]
    },
    {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories').then(m => m.Categories),
        canActivate: [authGuard]
    },
    {
        path: 'find-electricians',
        loadComponent: () => import('./pages/find-electricians/find-electricians').then(m => m.FindElectricians),
        canActivate: [authGuard]
    },
    {
        path: 'find-plumbers',
        loadComponent: () => import('./pages/find-plumbers/find-plumbers').then(m => m.FindPlumbers),
        canActivate: [authGuard]
    },
    {
        path: 'electrician/:id',
        loadComponent: () => import('./pages/electrician-detail/electrician-detail').then(m => m.ElectricianDetail),
        canActivate: [authGuard]
    },
    {
        path: 'plumber/:id',
        loadComponent: () => import('./pages/plumber-detail/plumber-detail').then(m => m.PlumberDetail),
        canActivate: [authGuard]
    },
    {
        path: 'booking/:id',
        loadComponent: () => import('./pages/booking/booking').then(m => m.BookingPage),
        canActivate: [authGuard]
    },
    {
        path: 'booking/plumber/:id',
        loadComponent: () => import('./pages/booking/booking').then(m => m.BookingPage),
        canActivate: [authGuard],
        data: { providerType: 'plumber' }
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services/services').then(m => m.Services),
        canActivate: [authGuard]
    },
    {
        path: 'electrician-register',
        loadComponent: () => import('./pages/electrician-register/electrician-register').then(m => m.ElectricianRegister),
        canActivate: [authGuard]
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
        loadComponent: () => import('./pages/about/about').then(m => m.About),
        canActivate: [authGuard]
    },
    {
        path: 'fault-diagnosis',
        loadComponent: () => import('./pages/fault-diagnosis/fault-diagnosis').then(m => m.FaultDiagnosis),
        canActivate: [authGuard]
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
