import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Pacientes</h2>
      
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let patient of patients">
            <td>{{patient.nombre}}</td>
            <td>{{patient.apellido}}</td>
            <td>{{patient.email}}</td>
            <td>{{patient.telefono}}</td>
            <td>
              <button (click)="editPatient(patient)">Editar</button>
              <button (click)="deletePatient(patient.id!)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="selectedPatient" class="form-container">
        <h3>{{isEditing ? 'Editar' : 'Nuevo'}} Paciente</h3>
        <form (submit)="savePatient()">
          <div>
            <label>Nombre:</label>
            <input [(ngModel)]="selectedPatient.nombre" name="nombre" required>
          </div>
          <div>
            <label>Apellido:</label>
            <input [(ngModel)]="selectedPatient.apellido" name="apellido" required>
          </div>
          <div>
            <label>Email:</label>
            <input [(ngModel)]="selectedPatient.email" name="email" type="email" required>
          </div>
          <div>
            <label>Teléfono:</label>
            <input [(ngModel)]="selectedPatient.telefono" name="telefono" required>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" (click)="cancelEdit()">Cancelar</button>
        </form>
      </div>

      <button *ngIf="!selectedPatient" (click)="startNewPatient()">Nuevo Paciente</button>
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
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  isEditing = false;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe(
      patients => this.patients = patients,
      error => console.error('Error loading patients:', error)
    );
  }

  startNewPatient() {
    this.selectedPatient = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fecha_nacimiento: new Date(),
      fecha_registro: new Date(),
      activo: true
    };
    this.isEditing = false;
  }

  editPatient(patient: Patient) {
    this.selectedPatient = {...patient};
    this.isEditing = true;
  }

  savePatient() {
    if (!this.selectedPatient) return;

    const operation = this.isEditing 
      ? this.patientService.updatePatient(this.selectedPatient.id!, this.selectedPatient)
      : this.patientService.createPatient(this.selectedPatient);

    operation.subscribe(
      () => {
        this.loadPatients();
        this.cancelEdit();
      },
      error => console.error('Error saving patient:', error)
    );
  }

  deletePatient(id: number) {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
      this.patientService.deletePatient(id).subscribe(
        () => this.loadPatients(),
        error => console.error('Error deleting patient:', error)
      );
    }
  }

  cancelEdit() {
    this.selectedPatient = null;
    this.isEditing = false;
  }
}