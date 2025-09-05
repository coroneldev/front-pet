import Curso from "./Curso";
import Usuario from "./Usuario";

export default interface Inscripcion {
    id?: number;
    nota: number;
    nota_literal: string;
    estado: string;
    user_id: number;
    curso_id: number;
    
    user: Usuario;
    curso: Curso;
}
