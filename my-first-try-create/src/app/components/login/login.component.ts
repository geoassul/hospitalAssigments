import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container animate-fade-in">
      <div class="login-box">
        <div class="login-header">
          <h1>Bienvenido</h1>
          <p>Ingrese sus credenciales para continuar</p>
        </div>

        <div class="error-message animate-shake" *ngIf="error">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          {{ error }}
        </div>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <div class="input-group">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                required
                placeholder="Ingrese su usuario"
                autocomplete="username">
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <input 
                [type]="showPassword ? 'text' : 'password'"
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                required
                placeholder="Ingrese su contraseña"
                autocomplete="current-password">
              <button 
                type="button" 
                class="password-toggle" 
                (click)="togglePassword()"
                [attr.aria-label]="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
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

          <button type="submit" class="btn-primary login-button">
            Iniciar Sesión
          </button>
        </form>

        <div class="register-link">
          ¿No tienes una cuenta? <a routerLink="/register">Regístrate aquí</a>
        </div>

        <div class="test-credentials">
          <h3>Credenciales de prueba:</h3>
          <div class="credential-item">
            <span>Usuario:</span>
            <code>admin</code>
          </div>
          <div class="credential-item">
            <span>Contraseña:</span>
            <code>admin123</code>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-md);
      background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 100%);
    }

    .login-box {
      width: 100%;
      max-width: 420px;
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-2xl);
      box-shadow: var(--shadow-lg);
    }

    .login-header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }

    .login-header h1 {
      color: var(--primary-900);
      margin-bottom: var(--space-xs);
    }

    .login-header p {
      color: var(--neutral-600);
    }

    .login-form {
      margin-bottom: var(--space-xl);
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: var(--space-md);
      width: 20px;
      height: 20px;
      color: var(--neutral-500);
    }

    .input-group input {
      padding-left: calc(var(--space-2xl) + var(--space-xs));
    }

    .password-toggle {
      position: absolute;
      right: var(--space-md);
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

    .login-button {
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

    .register-link {
      text-align: center;
      margin-top: var(--space-lg);
      padding-top: var(--space-md);
      border-top: 1px solid var(--neutral-200);
      color: var(--neutral-600);
    }

    .register-link a {
      color: var(--primary-600);
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    .test-credentials {
      margin-top: var(--space-xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--neutral-200);
    }

    .test-credentials h3 {
      color: var(--neutral-600);
      font-size: 1rem;
      margin-bottom: var(--space-md);
    }

    .credential-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-sm);
    }

    .credential-item span {
      color: var(--neutral-600);
    }

    .credential-item code {
      background: var(--neutral-100);
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-sm);
      font-family: monospace;
      color: var(--primary-700);
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
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error => {
        this.error = 'Error al intentar iniciar sesión';
        console.error('Login error:', error);
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}