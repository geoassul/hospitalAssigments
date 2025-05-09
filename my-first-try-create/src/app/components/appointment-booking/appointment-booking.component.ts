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
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
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
      estado: 'pendiente',
      metodo_pago_id: this.selectedPayment.id,
      motivo: `Consulta de ${this.selectedSpecialty.nombre}`,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date()
    };

    this.appointmentService.createAppointment(appointment).subscribe(
      () => {
        console.log('Appointment created successfully');
        this.router.navigate(['/']);
      },
      error => console.error('Error creating appointment:', error)
    );
  }
}