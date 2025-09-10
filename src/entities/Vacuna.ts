export default interface Vacuna {
  id?: number;
  nombre: string;                     // Nombre de la vacuna
  descripcion?: string;               // Descripción opcional
  especie_destinada: string;          // Especie a la que está destinada
  estado?: boolean;                   // Activa o inactiva

}
