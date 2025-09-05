import http from "@/http-common";

class InscripcionService {

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

  private configBlob: any = {
    headers: {
        Authorization: 'Bearer ' + this.token
    },
    responseType: 'blob'
  }

  getAll(): Promise<any> {
    return http.get("/api/inscripciones", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/inscripciones/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/inscripciones", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/inscripciones/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/inscripciones/${id}`, this.config);
  }

  certificado(id: any) {
    //return http.get<any>(url, { responseType: 'blob' });
    return http.get<any>(`/api/inscripciones/${id}/certificado`, this.configBlob);
  }

  getAllByUser(id: any): Promise<any> {
    return http.get(`/api/inscripciones-usuario/${id}`, this.config);
  }


}

export default new InscripcionService();