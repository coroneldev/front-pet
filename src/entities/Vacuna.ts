import Usuario from './Usuario';

export default interface Vacuna {
  id?: number;
  nombre: string;
  descripcion?: string;
  numero_dosis_requeridas: number;
  intervalo_dosis: number;    // En días
  especie_destinada: string;
  estado: boolean;

  usuario_id: number;         // ID que se enviará al backend
  usuario?: Usuario;          // Objeto opcional (el veterinario asignado)

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
