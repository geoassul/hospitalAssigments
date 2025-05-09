import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-toni',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-toni.component.html',
  styleUrls: ['./home-toni.component.css']
})
export class HomeToniComponent {
  isMenuOpen = false;
  activeDropdown: string | null = null;

  constructor(private authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
    }
  }

  toggleDropdown(dropdownName: string, event: Event) {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === dropdownName ? null : dropdownName;
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.activeDropdown = null;
    }
  }
}
