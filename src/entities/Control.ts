import Usuario from "./Usuario";
import Cliente from "./Cliente";
import Mascota from "./Mascota";
import Vacuna from "./Vacuna";

export default interface Control {
    id?: number;
    fecha_aplicacion: string;       // Fecha de aplicación de la vacuna o control
    proxima_aplicacion?: string;    // Fecha de próxima aplicación (opcional)
    observaciones?: string;         // Observaciones adicionales

    user_id: number;                // Responsable del control (veterinario / usuario)
    cliente_id?: number;            // Opcional: si aplica a un cliente específico
    mascota_id?: number;            // Opcional: si aplica a una mascota específica
    vacuna_id?: number;             // Opcional: si aplica a una vacuna específica

    usuario?: Usuario;              // Relación con usuario
    cliente?: Cliente;              // Relación con cliente
    mascota?: Mascota;              // Relación con mascota
    vacuna?: Vacuna;                // Relación con vacuna
}
