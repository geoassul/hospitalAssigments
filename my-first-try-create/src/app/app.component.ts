import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Navigation -->
    <nav class="navbar" *ngIf="authService.isLoggedIn()">
      <div class="nav-container">
        <h1>Sistema de Gestión Hospitalaria</h1>
        <ul class="nav-links">
          <li><a routerLink="/home-toni" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/second-home-toni" routerLinkActive="active">Second Home</a></li>
          <li><a routerLink="/patients" routerLinkActive="active">Pacientes</a></li>
          <li><a routerLink="/doctors" routerLinkActive="active">Médicos</a></li>
          <li class="dropdown">
            <a href="#" (click)="toggleUserMenu($event)">Opciones</a>
            <ul *ngIf="isUserMenuOpen" class="dropdown-menu">
              <li><a href="#" (click)="cerrarSesion()">Cerrar Sesión</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main [class.main-content]="authService.isLoggedIn()">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserMenuOpen = false;

  constructor(public authService: AuthService) {}

  toggleUserMenu(event: Event) {
    event.preventDefault();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isUserMenuOpen = false;
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}