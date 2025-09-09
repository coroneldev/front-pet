import http from "@/http-common";

class ClienteService {
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

  getAll(): Promise<any> {
    return http.get("/api/clientes", this.config);
  }

  get(id: any): Promise<any> {
    return http.get(`/api/clientes/${id}`, this.config);
  }

  create(data: any): Promise<any> {
    return http.post("/api/clientes", data, this.config);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/api/clientes/${id}`, data, this.config);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/api/clientes/${id}`, this.config);
  }
}

export default new ClienteService();
