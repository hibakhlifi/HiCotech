import axios from "../utils/axiosInstance";

export function getAllProgrammeApi(data) {
  return axios.get("/api/programmes", { params: data });
}
export function getProgrammeApi(id) {
  return axios.get(`/api/programmes/${id}`);
}

export function updateProgrammeApi(id, data) {
  return axios.put(`/api/programmes/${id}`, data);
}

export function addProgrammeApi(data) {
  return axios.post("/api/programmes/", data);
}

export function deleteProgrammeApi(id) {
  return axios.delete(`/api/programmes/${id}`);
}
