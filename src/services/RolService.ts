import http from "@/http-common";

class RolService {

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
    return http.get("/api/roles", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/roles/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/roles", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/roles/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/roles/${id}`, this.config);
  }

}

export default new RolService();