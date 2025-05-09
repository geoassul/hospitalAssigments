export interface Appointment {
    id?: number;
    paciente_id: number;
    medico_id: number;
    especialidad_id: number;
    fecha_hora: Date;
    motivo: string;
    estado: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}