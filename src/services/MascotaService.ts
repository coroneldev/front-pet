import http from "@/http-common";

class MascotaService {
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

    // Obtener todas las mascotas
    getAll(): Promise<any> {
        return http.get("/api/mascotas", this.config);
    }

    // Obtener una mascota por ID
    get(id: any): Promise<any> {
        return http.get(`/api/mascotas/${id}`, this.config);
    }

    // Crear una nueva mascota
    create(data: any): Promise<any> {
        return http.post("/api/mascotas", data, this.config);
    }

    // Actualizar una mascota completa
    update(id: any, data: any): Promise<any> {
        return http.put(`/api/mascotas/${id}`, data, this.config);
    }

    // Eliminar una mascota
    delete(id: any): Promise<any> {
        return http.delete(`/api/mascotas/${id}`, this.config);
    }

    // Actualizar solo la imagen de la mascota
    updateImagen(id: any, formData: FormData): Promise<any> {
        return http.post(`/api/mascotas/${id}/imagen`, formData, this.configFile);
    }
}

export default new MascotaService();
