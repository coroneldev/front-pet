import http from "@/http-common";

class CursoService {

  private token = localStorage.getItem("token");

  private config: any = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
      }
  }

  private configFile: any = {
      headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.token
      }
  }

  getAll(): Promise<any> {
    return http.get("/api/cursos", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/cursos/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/cursos", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/cursos/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/cursos/${id}`, this.config);
  }

  updateImagen(id: any, formData: FormData): Promise<any> {
    return http.post(`/api/cursos/${id}/imagen`, formData, this.configFile);
  }

}

export default new CursoService();