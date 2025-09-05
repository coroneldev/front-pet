import Rol from "./Rol";

export default interface Usuario {
    id?: number;
    apellido_paterno: string;
    apellido_materno: string;
    nombres: string;
    cedula_identidad: string;
    expedicion_ci: string;
    fecha_nacimiento: any;
    sexo: string;
    celular: string;
    email: string;
    password: string;
    estado: string;
    rol_id: any;

    rol: Rol;
}
