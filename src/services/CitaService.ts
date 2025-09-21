import http from "@/http-common";

class CitaService {

    private token = localStorage.getItem("token");

    private config: any = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
        },
    };

    private configFile: any = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
        },
    };

    // Obtener todas las citas
    getAll(): Promise<any> {
        return http.get("/api/citas", this.config);
    }

    // Obtener una cita por ID
    get(id: any): Promise<any> {
        return http.get(`/api/citas/${id}`, this.config);
    }

    // Crear una cita
    create(data: any): Promise<any> {
        return http.post("/api/citas", data, this.config);
    }

    // Actualizar una cita
    update(id: any, data: any): Promise<any> {
        return http.put(`/api/citas/${id}`, data, this.config);
    }

    // Eliminar (soft delete) una cita
    delete(id: any): Promise<any> {
        return http.delete(`/api/citas/${id}`, this.config);
    }

    // Descargar PDF de la cita
    downloadPdf(id: any): Promise<any> {
        return http.get(`/api/citas/${id}/pdf`, {
            ...this.config,
            responseType: "blob", // importante para archivos
        });
    }
}

export default new CitaService();
