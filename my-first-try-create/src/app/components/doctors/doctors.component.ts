import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../interfaces/doctor.interface';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
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