export default interface Mascota {
  id?: number;
  codigo: string;
  nombre: string;
  edad?: number;
  peso?: number;
  foto?: string;
  especie: string;
  raza?: string;
  sexo?: 'MACHO' | 'HEMBRA';
  detalles?: string;
  cliente_id: number;          // ID que se enviará al backend
  cliente?: {                  // Opcional: objeto completo para mostrar en formulario
    id: number;
    nombre: string;
  };
}
