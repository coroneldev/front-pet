export default interface Cita {
    id?: number;
    fecha: string;       // formato: YYYY-MM-DD
    hora_inicio: string;        // formato: HH:mm
    hora_fin: string;        // formato: HH:mm
    observacion: string;        // formato: HH:mm
    motivo: string;
    estado: string;
    cliente_id: number;
    mascota_id: number;
    user_id?: number; // <-- Agregado

    // Relaciones opcionales cargadas desde backend
    cliente?: {
        id: number;
        nombre: string;
        email: string;
        documento: string;
        telefono: string;
        direccion: string;
    };
    mascota?: {
        id: number;
        nombre: string;
        especie: string;
        raza?: string;
        edad?: number;
        peso?: number;
        sexo?: string;
        detalles?: string;
        codigo: string;
        foto?: string;
    };
}
