import axios from "../utils/axiosInstance";

export function getAllDefiApi(data) {
  return axios.get("/api/defis", { params: data });
}
export function getDefiApi(id) {
  return axios.get(`/api/defis/${id}`);
}

export function updateDefiApi(id, data) {
  return axios.put(`/api/defis/${id}`, data);
}

export function addDefiApi(data) {
  return axios.post("/api/defis/", data);
}

export function deleteDefiApi(id) {
  return axios.delete(`/api/defis/${id}`);
}
