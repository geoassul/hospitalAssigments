import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container animate-fade-in">
      <div class="register-box">
        <div class="register-header">
          <h1>Crear Cuenta</h1>
          <p>Complete el formulario para registrarse</p>
        </div>

        <div class="error-message animate-shake" *ngIf="error">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          {{ error }}
        </div>

        <form (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-group">
            <label for="username">Usuario *</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="formData.username" 
              required>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="formData.email" 
              required>
          </div>

          <div class="form-group">
            <label for="firstName">Nombre *</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              [(ngModel)]="formData.firstName" 
              required>
          </div>

          <div class="form-group">
            <label for="lastName">Apellido *</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              [(ngModel)]="formData.lastName" 
              required>
          </div>

          <div class="form-group">
            <label for="password">Contraseña *</label>
            <div class="input-group">
              <input 
                [type]="showPassword ? 'text' : 'password'"
                id="password" 
                name="password" 
                [(ngModel)]="formData.password" 
                required>
              <button 
                type="button" 
                class="password-toggle" 
                (click)="togglePassword()">
                <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="role">Rol *</label>
            <select 
              id="role" 
              name="role" 
              [(ngModel)]="formData.role" 
              required>
              <option value="staff">Personal</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button type="submit" class="btn-primary register-button">
            Registrarse
          </button>
        </form>

        <div class="login-link">
          ¿Ya tienes una cuenta? <a routerLink="/login">Iniciar Sesión</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-md);
      background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 100%);
    }

    .register-box {
      width: 100%;
      max-width: 480px;
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-2xl);
      box-shadow: var(--shadow-lg);
    }

    .register-header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }

    .register-header h1 {
      color: var(--primary-900);
      margin-bottom: var(--space-xs);
    }

    .register-header p {
      color: var(--neutral-600);
    }

    .register-form {
      display: grid;
      gap: var(--space-md);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .form-group label {
      color: var(--neutral-700);
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      padding: var(--space-md);
      border: 1px solid var(--neutral-300);
      border-radius: var(--radius-md);
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: var(--primary-500);
      box-shadow: 0 0 0 2px var(--primary-100);
      outline: none;
    }

    .input-group {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: var(--space-md);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--neutral-500);
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .password-toggle:hover {
      color: var(--primary-600);
    }

    .password-toggle .icon {
      width: 20px;
      height: 20px;
    }

    .register-button {
      width: 100%;
      padding: var(--space-md);
      margin-top: var(--space-lg);
      font-size: 1.1rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      background-color: var(--error-color);
      color: white;
      border-radius: var(--radius-md);
      margin-bottom: var(--space-lg);
    }

    .error-message .icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .login-link {
      text-align: center;
      margin-top: var(--space-xl);
      color: var(--neutral-600);
    }

    .login-link a {
      color: var(--primary-600);
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }
  `]
})
export class RegisterComponent {
  formData: RegisterRequest = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'staff'
  };

  error: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.validateForm()) {
      this.authService.register(this.formData).subscribe({
        next: () => {
          // Auto-login after successful registration
          this.authService.login(this.formData.username, this.formData.password).subscribe(
            success => {
              if (success) {
                this.router.navigate(['/']);
              }
            }
          );
        },
        error: (err) => {
          this.error = err.message || 'Error al registrar usuario';
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.formData.username || !this.formData.password || !this.formData.email ||
        !this.formData.firstName || !this.formData.lastName) {
      this.error = 'Por favor complete todos los campos requeridos';
      return false;
    }
    
    if (!this.validateEmail(this.formData.email)) {
      this.error = 'Por favor ingrese un email válido';
      return false;
    }

    if (this.formData.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}