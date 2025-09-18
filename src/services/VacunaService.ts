import http from "@/http-common";

class VacunaService {
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

  // Obtener todas las vacunas
  getAll(): Promise<any> {
    return http.get("/api/vacunas", this.config);
  }

  // Obtener una vacuna por ID
  get(id: number): Promise<any> {
    return http.get(`/api/vacunas/${id}`, this.config);
  }

  // Crear vacuna
  create(data: any): Promise<any> {
    return http.post("/api/vacunas", data, this.config);
  }

  // Actualizar vacuna
  update(id: number, data: any): Promise<any> {
    return http.put(`/api/vacunas/${id}`, data, this.config);
  }

  // Eliminar vacuna
  delete(id: number): Promise<any> {
    return http.delete(`/api/vacunas/${id}`, this.config);
  }

  // 👉 Extra opcionales según tu backend

  // Buscar vacunas por especie
  getByEspecie(especie: string): Promise<any> {
    return http.get(`/api/vacunas/especie/${especie}`, this.config);
  }

  // Vacunas activas
  getActivas(): Promise<any> {
    return http.get("/api/vacunas-activas", this.config);
  }
}

export default new VacunaService();
