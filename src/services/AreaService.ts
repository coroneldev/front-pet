import http from "@/http-common";

class AreaService {

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
    return http.get("/api/areas", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/areas/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/areas", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/areas/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/areas/${id}`, this.config);
  }

}

export default new AreaService();