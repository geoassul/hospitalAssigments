import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Appointment } from '../interfaces/appointment.interface';
import { Specialty } from '../interfaces/specialty.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'your-api-base-url/appointments';

  // Mock data for testing
  private mockSpecialties: Specialty[] = [
    { id: 1, nombre: 'Cardiología', descripcion: 'Especialidad del corazón' },
    { id: 2, nombre: 'Dermatología', descripcion: 'Especialidad de la piel' },
    { id: 3, nombre: 'Pediatría', descripcion: 'Medicina para niños' }
  ];

  private mockPaymentMethods: PaymentMethod[] = [
    { id: 1, nombre: 'Tarjeta de Crédito', descripcion: 'Pago con tarjeta de crédito', activo: true },
    { id: 2, nombre: 'Efectivo', descripcion: 'Pago en efectivo', activo: true },
    { id: 3, nombre: 'Seguro Médico', descripcion: 'Pago a través del seguro', activo: true }
  ];

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getSpecialties(): Observable<Specialty[]> {
    // Mock data - replace with actual API call
    return of(this.mockSpecialties);
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    // Mock data - replace with actual API call
    return of(this.mockPaymentMethods);
  }

  getDoctorsBySpecialty(specialtyId: number): Observable<any[]> {
    // Mock data - replace with actual API call
    return of([
      { id: 1, nombre: 'Dr. Juan', apellido: 'Pérez', especialidad_id: 1 },
      { id: 2, nombre: 'Dra. María', apellido: 'González', especialidad_id: 1 }
    ]);
  }

  getAvailableTimeSlots(doctorId: number, date: Date): Observable<Date[]> {
    // Mock data - replace with actual API call
    const timeSlots = [];
    const baseDate = new Date(date);
    for (let i = 9; i < 17; i++) {
      timeSlots.push(new Date(baseDate.setHours(i, 0, 0)));
    }
    return of(timeSlots);
  }
}