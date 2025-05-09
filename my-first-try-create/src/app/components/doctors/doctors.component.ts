import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../interfaces/doctor.interface';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Médicos</h2>
      
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad ID</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let doctor of doctors">
            <td>{{doctor.nombre}}</td>
            <td>{{doctor.apellido}}</td>
            <td>{{doctor.especialidad_id}}</td>
            <td>{{doctor.email}}</td>
            <td>{{doctor.telefono}}</td>
            <td>
              <button (click)="editDoctor(doctor)">Editar</button>
              <button (click)="deleteDoctor(doctor.id!)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="selectedDoctor" class="form-container">
        <h3>{{isEditing ? 'Editar' : 'Nuevo'}} Médico</h3>
        <form (submit)="saveDoctor()">
          <div>
            <label>Nombre:</label>
            <input [(ngModel)]="selectedDoctor.nombre" name="nombre" required>
          </div>
          <div>
            <label>Apellido:</label>
            <input [(ngModel)]="selectedDoctor.apellido" name="apellido" required>
          </div>
          <div>
            <label>Especialidad ID:</label>
            <input [(ngModel)]="selectedDoctor.especialidad_id" name="especialidad_id" type="number" required>
          </div>
          <div>
            <label>Email:</label>
            <input [(ngModel)]="selectedDoctor.email" name="email" type="email" required>
          </div>
          <div>
            <label>Teléfono:</label>
            <input [(ngModel)]="selectedDoctor.telefono" name="telefono" required>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" (click)="cancelEdit()">Cancelar</button>
        </form>
      </div>

      <button *ngIf="!selectedDoctor" (click)="startNewDoctor()">Nuevo Médico</button>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table th, .table td { padding: 8px; border: 1px solid #ddd; }
    .form-container { margin-top: 20px; }
    .form-container div { margin-bottom: 10px; }
    button { margin-right: 5px; }
  `]
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  isEditing = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(
      doctors => this.doctors = doctors,
      error => console.error('Error loading doctors:', error)
    );
  }

  startNewDoctor() {
    this.selectedDoctor = {
      nombre: '',
      apellido: '',
      especialidad_id: 0,
      email: '',
      telefono: '',
      fecha_registro: new Date(),
      activo: true
    };
    this.isEditing = false;
  }

  editDoctor(doctor: Doctor) {
    this.selectedDoctor = {...doctor};
    this.isEditing = true;
  }

  saveDoctor() {
    if (!this.selectedDoctor) return;

    const operation = this.isEditing 
      ? this.doctorService.updateDoctor(this.selectedDoctor.id!, this.selectedDoctor)
      : this.doctorService.createDoctor(this.selectedDoctor);

    operation.subscribe(
      () => {
        this.loadDoctors();
        this.cancelEdit();
      },
      error => console.error('Error saving doctor:', error)
    );
  }

  deleteDoctor(id: number) {
    if (confirm('¿Está seguro de eliminar este médico?')) {
      this.doctorService.deleteDoctor(id).subscribe(
        () => this.loadDoctors(),
        error => console.error('Error deleting doctor:', error)
      );
    }
  }

  cancelEdit() {
    this.selectedDoctor = null;
    this.isEditing = false;
  }
}