import http from "@/http-common";

class UsuarioService {

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
    return http.get("/api/usuarios", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/usuarios/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/usuarios", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/usuarios/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/usuarios/${id}`, this.config);
  }

  getAllDocente(): Promise<any> {
    return http.get("/api/usuarios-docentes", this.config);
  }

  getBuscarCi(ci: string): Promise<any> {
    return http.get(`/api/usuarios/${ci}/estudiante`, this.config);
  }

  resetPassword(id: any): Promise<any> {
    return http.put(`/api/usuarios/${id}/reset-password`, null, this.config);
  }

  cambiarPassword(id: any, data: any): Promise<any> {
    return http.put(`/api/usuarios/${id}/cambiar-password`, data, this.config);
  }

}

export default new UsuarioService();