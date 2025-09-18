import http from "@/http-common";

class ControlService {
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

    // Obtener todos los controles
    getAll(): Promise<any> {
        return http.get("/api/controles", this.config);
    }

    // Obtener un control por ID
    get(id: any): Promise<any> {
        return http.get(`/api/controles/${id}`, this.config);
    }

    // Crear un nuevo control
    create(data: any): Promise<any> {
        return http.post("/api/controles", data, this.config);
    }

    // Actualizar un control existente
    update(id: any, data: any): Promise<any> {
        return http.put(`/api/controles/${id}`, data, this.config);
    }

    // Eliminar un control
    delete(id: any): Promise<any> {
        return http.delete(`/api/controles/${id}`, this.config);
    }
}

export default new ControlService();
