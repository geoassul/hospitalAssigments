import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Specialty } from '../../interfaces/specialty.interface';
import { PaymentMethod } from '../../interfaces/payment-method.interface';
import { Doctor } from '../../interfaces/doctor.interface';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-container">
      <div class="progress-bar">
        <div class="progress-step" [class.active]="currentStep >= 1">1. Especialidad</div>
        <div class="progress-step" [class.active]="currentStep >= 2">2. Doctor</div>
        <div class="progress-step" [class.active]="currentStep >= 3">3. Fecha y Hora</div>
        <div class="progress-step" [class.active]="currentStep >= 4">4. Pago</div>
      </div>

      <!-- Step 1: Specialty Selection -->
      <div class="booking-step" *ngIf="currentStep === 1">
        <h2>Seleccione la Especialidad</h2>
        <div class="specialty-grid">
          <div 
            *ngFor="let specialty of specialties" 
            class="specialty-card"
            [class.selected]="selectedSpecialty?.id === specialty.id"
            (click)="selectSpecialty(specialty)">
            <h3>{{specialty.nombre}}</h3>
            <p>{{specialty.descripcion}}</p>
          </div>
        </div>
        <div class="buttons">
          <button class="next-button" [disabled]="!selectedSpecialty" (click)="nextStep()">
            Siguiente
          </button>
        </div>
      </div>

      <!-- Step 2: Doctor Selection -->
      <div class="booking-step" *ngIf="currentStep === 2">
        <h2>Seleccione el Doctor</h2>
        <div class="doctor-grid">
          <div 
            *ngFor="let doctor of doctors" 
            class="doctor-card"
            [class.selected]="selectedDoctor?.id === doctor.id"
            (click)="selectDoctor(doctor)">
            <h3>Dr. {{doctor.nombre}} {{doctor.apellido}}</h3>
          </div>
        </div>
        <div class="buttons">
          <button class="back-button" (click)="previousStep()">Anterior</button>
          <button class="next-button" [disabled]="!selectedDoctor" (click)="nextStep()">
            Siguiente
          </button>
        </div>
      </div>

      <!-- Step 3: Date and Time Selection -->
      <div class="booking-step" *ngIf="currentStep === 3">
        <h2>Seleccione Fecha y Hora</h2>
        <div class="datetime-selector">
          <div class="date-picker">
            <label>Fecha:</label>
            <input 
              type="date" 
              [(ngModel)]="selectedDate"
              (change)="loadTimeSlots()"
              [min]="minDate">
          </div>
          <div class="time-slots" *ngIf="selectedDate">
            <label>Hora disponible:</label>
            <div class="time-grid">
              <button 
                *ngFor="let slot of timeSlots"
                class="time-slot"
                [class.selected]="selectedTime === slot"
                (click)="selectTime(slot)">
                {{slot | date:'shortTime'}}
              </button>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="back-button" (click)="previousStep()">Anterior</button>
          <button class="next-button" [disabled]="!selectedTime" (click)="nextStep()">
            Siguiente
          </button>
        </div>
      </div>

      <!-- Step 4: Payment Method -->
      <div class="booking-step" *ngIf="currentStep === 4">
        <h2>Método de Pago</h2>
        <div class="payment-grid">
          <div 
            *ngFor="let method of paymentMethods" 
            class="payment-card"
            [class.selected]="selectedPayment?.id === method.id"
            (click)="selectPayment(method)">
            <h3>{{method.nombre}}</h3>
            <p>{{method.descripcion}}</p>
          </div>
        </div>
        <div class="appointment-summary" *ngIf="selectedPayment">
          <h3>Resumen de la Cita</h3>
          <p><strong>Especialidad:</strong> {{selectedSpecialty?.nombre}}</p>
          <p><strong>Doctor:</strong> Dr. {{selectedDoctor?.nombre}} {{selectedDoctor?.apellido}}</p>
          <p><strong>Fecha:</strong> {{selectedDate | date:'mediumDate'}}</p>
          <p><strong>Hora:</strong> {{selectedTime | date:'shortTime'}}</p>
          <p><strong>Método de Pago:</strong> {{selectedPayment.nombre}}</p>
        </div>
        <div class="buttons">
          <button class="back-button" (click)="previousStep()">Anterior</button>
          <button class="confirm-button" [disabled]="!selectedPayment" (click)="confirmAppointment()">
            Confirmar Cita
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .progress-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3rem;
      position: relative;
    }

    .progress-bar::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: #e0e0e0;
      z-index: 1;
    }

    .progress-step {
      position: relative;
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      color: #666;
      z-index: 2;
    }

    .progress-step.active {
      background: #3498db;
      color: white;
    }

    .booking-step {
      margin-top: 2rem;
    }

    .specialty-grid,
    .doctor-grid,
    .payment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .specialty-card,
    .doctor-card,
    .payment-card {
      padding: 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .specialty-card:hover,
    .doctor-card:hover,
    .payment-card:hover {
      border-color: #3498db;
      transform: translateY(-2px);
    }

    .specialty-card.selected,
    .doctor-card.selected,
    .payment-card.selected {
      border-color: #3498db;
      background: #ebf5fb;
    }

    .datetime-selector {
      display: grid;
      gap: 2rem;
    }

    .date-picker {
      margin-bottom: 1.5rem;
    }

    .date-picker input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .time-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .time-slot {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .time-slot:hover {
      border-color: #3498db;
    }

    .time-slot.selected {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .next-button,
    .back-button,
    .confirm-button {
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .next-button,
    .confirm-button {
      background: #3498db;
      color: white;
      border: none;
    }

    .next-button:hover,
    .confirm-button:hover {
      background: #2980b9;
    }

    .next-button:disabled,
    .confirm-button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .back-button {
      background: #ecf0f1;
      color: #2c3e50;
      border: none;
    }

    .back-button:hover {
      background: #bdc3c7;
    }

    .appointment-summary {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .appointment-summary h3 {
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    .appointment-summary p {
      margin: 0.5rem 0;
      color: #666;
    }
  `]
})
export class AppointmentBookingComponent implements OnInit {
  currentStep = 1;
  specialties: Specialty[] = [];
  doctors: Doctor[] = [];
  paymentMethods: PaymentMethod[] = [];
  timeSlots: Date[] = [];

  selectedSpecialty: Specialty | null = null;
  selectedDoctor: Doctor | null = null;
  selectedDate: string = '';
  selectedTime: Date | null = null;
  selectedPayment: PaymentMethod | null = null;

  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.appointmentService.getSpecialties().subscribe(
      specialties => this.specialties = specialties,
      error => console.error('Error loading specialties:', error)
    );
  }

  selectSpecialty(specialty: Specialty) {
    this.selectedSpecialty = specialty;
    this.loadDoctors();
  }

  loadDoctors() {
    if (this.selectedSpecialty) {
      this.appointmentService.getDoctorsBySpecialty(this.selectedSpecialty.id).subscribe(
        doctors => this.doctors = doctors,
        error => console.error('Error loading doctors:', error)
      );
    }
  }

  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

  loadTimeSlots() {
    if (this.selectedDoctor && this.selectedDate) {
      this.appointmentService.getAvailableTimeSlots(
        this.selectedDoctor.id!,
        new Date(this.selectedDate)
      ).subscribe(
        slots => this.timeSlots = slots,
        error => console.error('Error loading time slots:', error)
      );
    }
  }

  selectTime(time: Date) {
    this.selectedTime = time;
  }

  loadPaymentMethods() {
    this.appointmentService.getPaymentMethods().subscribe(
      methods => this.paymentMethods = methods,
      error => console.error('Error loading payment methods:', error)
    );
  }

  selectPayment(method: PaymentMethod) {
    this.selectedPayment = method;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      if (this.currentStep === 4) {
        this.loadPaymentMethods();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  confirmAppointment() {
    if (!this.selectedSpecialty || !this.selectedDoctor || 
        !this.selectedTime || !this.selectedPayment) {
      return;
    }

    const appointment = {
      paciente_id: 1, // Should come from logged in user
      medico_id: this.selectedDoctor.id!,
      especialidad_id: this.selectedSpecialty.id,
      fecha_hora: this.selectedTime,
      motivo: 'Consulta general',
      estado: 'pendiente',
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date()
    };

    this.appointmentService.createAppointment(appointment).subscribe(
      result => {
        alert('Cita agendada con éxito');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error creating appointment:', error);
        alert('Error al agendar la cita');
      }
    );
  }
}