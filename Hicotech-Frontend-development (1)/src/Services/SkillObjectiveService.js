import axios from "../utils/axiosInstance";

export function getAllObjectiveApi(data) {
  return axios.get("/api/SkillObjectives", { params: data });
}
export function getObjectiveApi(id) {
  return axios.get(`/api/skillObjectives/${id}`);
}
export function updateSkillObjectiveApi(id, data) {
  return axios.put(`/api/skillObjectives/${id}`, data);
}
export function addObjectiveApi(data) {
  return axios.post("/api/skillObjective/", data);
}
export function deleteSkillObjectiveApi(id) {
  return axios.delete(`/api/skillObjectives/${id}`);
}
