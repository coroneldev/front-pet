import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  //baseURL: "http://localhost:8000",
  baseURL: process.env.VUE_APP_BASE_URL,
  // headers: {
  //   "Content-type": "application/json",
  // },
});

export default apiClient;