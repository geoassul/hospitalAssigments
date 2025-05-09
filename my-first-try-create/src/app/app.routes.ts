import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'home-toni',
    loadComponent: () => import('./home-toni/home-toni.component').then(m => m.HomeToniComponent),
    canActivate: [authGuard]
  },
  {
    path: 'second-home-toni',
    loadComponent: () => import('./second-home-toni/second-home-toni.component').then(m => m.SecondHomeToniComponent),
    canActivate: [authGuard]
  },
  {
    path: 'appointment/new',
    loadComponent: () => import('./components/appointment-booking/appointment-booking.component').then(m => m.AppointmentBookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'patients',
    loadComponent: () => import('./components/patients/patients.component').then(m => m.PatientsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'doctors',
    loadComponent: () => import('./components/doctors/doctors.component').then(m => m.DoctorsComponent),
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
