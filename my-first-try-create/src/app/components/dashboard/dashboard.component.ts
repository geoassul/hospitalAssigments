import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container animate-fade-in">
      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <div class="welcome-content">
          <h1>¡Bienvenido al Sistema de Gestión Hospitalaria!</h1>
          <p>Gestione sus citas y acceda a servicios médicos de manera fácil y rápida</p>
        </div>
        <div class="welcome-decoration">
          <svg xmlns="http://www.w3.org/2000/svg" class="decoration-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="quick-actions-grid">
        <!-- New Appointment Card -->
        <div class="action-card animate-slide-in" style="animation-delay: 0.1s">
          <div class="card-icon primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3>Nueva Cita</h3>
          <p>Agende una nueva cita médica con nuestros especialistas</p>
          <button routerLink="/appointment/new" class="btn btn-primary">
            Agendar Cita
          </button>
        </div>

        <!-- My Appointments Card -->
        <div class="action-card animate-slide-in" style="animation-delay: 0.2s">
          <div class="card-icon success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3>Mis Citas</h3>
          <p>Vea su historial y próximas citas programadas</p>
          <button routerLink="/appointments" class="btn btn-secondary">
            Ver Citas
          </button>
        </div>

        <!-- Specialties Card -->
        <div class="action-card animate-slide-in" style="animation-delay: 0.3s">
          <div class="card-icon info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3>Especialidades</h3>
          <p>Explore nuestras especialidades médicas disponibles</p>
          <button routerLink="/specialties" class="btn btn-secondary">
            Ver Especialidades
          </button>
        </div>
      </div>

      <!-- Upcoming Appointments Section -->
      <div class="upcoming-appointments animate-fade-in" style="animation-delay: 0.4s" *ngIf="nextAppointments.length > 0">
        <h2>Próximas Citas</h2>
        <div class="appointments-grid">
          <div class="appointment-card" *ngFor="let appointment of nextAppointments">
            <div class="appointment-date">
              <div class="date-badge">
                <span class="month">{{appointment.fecha_hora | date:'MMM'}}</span>
                <span class="day">{{appointment.fecha_hora | date:'dd'}}</span>
              </div>
              <span class="time">{{appointment.fecha_hora | date:'shortTime'}}</span>
            </div>
            <div class="appointment-info">
              <h4>Consulta Médica</h4>
              <p><strong>Doctor:</strong> {{getDoctorName(appointment.medico_id)}}</p>
              <p><strong>Motivo:</strong> {{appointment.motivo}}</p>
            </div>
            <div class="appointment-status" [class.status-pending]="appointment.estado === 'pendiente'">
              {{appointment.estado | titlecase}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: var(--space-lg);
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-banner {
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      margin-bottom: var(--space-xl);
      color: white;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .welcome-content {
      max-width: 600px;
    }

    .welcome-content h1 {
      color: white;
      margin-bottom: var(--space-sm);
      font-size: 2rem;
    }

    .welcome-content p {
      color: var(--primary-100);
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .welcome-decoration {
      position: relative;
    }

    .decoration-icon {
      width: 180px;
      height: 180px;
      color: rgba(255, 255, 255, 0.2);
      transform: rotate(-15deg);
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-lg);
      margin-bottom: var(--space-2xl);
    }

    .action-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-sm);
    }

    .card-icon svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    .card-icon.primary { background-color: var(--primary-600); }
    .card-icon.success { background-color: var(--success-color); }
    .card-icon.info { background-color: var(--info-color); }

    .action-card h3 {
      font-size: 1.25rem;
      color: var(--neutral-900);
      margin: 0;
    }

    .action-card p {
      color: var(--neutral-600);
      margin: 0;
      flex-grow: 1;
    }

    .appointments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--space-lg);
      margin-top: var(--space-lg);
    }

    .appointment-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      box-shadow: var(--shadow-md);
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: var(--space-lg);
      align-items: center;
      transition: transform 0.3s ease;
    }

    .appointment-card:hover {
      transform: translateY(-2px);
    }

    .date-badge {
      background: var(--primary-50);
      border-radius: var(--radius-md);
      padding: var(--space-sm);
      text-align: center;
      min-width: 80px;
    }

    .date-badge .month {
      display: block;
      color: var(--primary-700);
      font-size: 0.875rem;
      text-transform: uppercase;
      font-weight: 500;
    }

    .date-badge .day {
      display: block;
      color: var(--primary-900);
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1;
    }

    .time {
      display: block;
      color: var(--neutral-600);
      font-size: 0.875rem;
      margin-top: var(--space-xs);
      text-align: center;
    }

    .appointment-info h4 {
      color: var(--neutral-900);
      margin: 0 0 var(--space-xs);
      font-size: 1.1rem;
    }

    .appointment-info p {
      margin: var(--space-xs) 0;
      color: var(--neutral-600);
    }

    .appointment-status {
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 500;
      background-color: var(--success-color);
      color: white;
    }

    .status-pending {
      background-color: var(--warning-color);
    }

    @media (max-width: 768px) {
      .welcome-banner {
        flex-direction: column;
        text-align: center;
        gap: var(--space-xl);
      }

      .welcome-content {
        max-width: 100%;
      }

      .decoration-icon {
        width: 120px;
        height: 120px;
      }

      .appointments-grid {
        grid-template-columns: 1fr;
      }

      .appointment-card {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .date-badge {
        margin: 0 auto;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  nextAppointments: Appointment[] = [];

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      appointments => {
        this.nextAppointments = appointments
          .filter(app => new Date(app.fecha_hora) > new Date())
          .sort((a, b) => new Date(a.fecha_hora).getTime() - new Date(b.fecha_hora).getTime())
          .slice(0, 3);
      },
      error => console.error('Error loading appointments:', error)
    );
  }

  getDoctorName(doctorId: number): string {
    // This should be implemented with actual doctor data
    return 'Dr. Example';
  }
}