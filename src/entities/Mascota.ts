export default interface Mascota {
  id?: number;

  codigo?: string; // lo puede devolver el backend, pero no se envía al crear

  nombre: string;
  edad?: number;
  peso?: number;
  foto?: string;
  especie: 'GATO' | 'PERRO' | 'OTROS';  // Restricción a estas opciones
  raza?: string;
  sexo?: 'MACHO' | 'HEMBRA';
  detalles?: string;

  cliente_id: number;   // ID que se enviará al backend
  cliente?: {           // Opcional: objeto completo para mostrar en formulario
    id: number;
    nombre: string;
  };
  
}