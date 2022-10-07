import axios from "../utils/axiosInstance";

export function getAllObjectiveApi(data) {
  return axios.get("/api/objectives", { params: data });
}
export function getObjectiveApi(id) {
  return axios.get(`/api/objectives/${id}`);
}
export function getStatObjectiveByCoachAndPlayerApi(playerData) {
  return axios.get("/api/StatObjectives", { params: playerData });
}
export function deleteObjectiveByCoachAndPlayerApi(id, playerData) {
  return axios.put(`/api//statObjectives/${id}`, { params: playerData });
}
export function deleteObjectiveSkillByCoachAndPlayerApi(id, playerData) {
  return axios.put(`/api/deleteObjectiveSkill/${id}`, { params: playerData });
}
export function updateObjectiveSkillByCoachAndPlayerApi(
  objectiveId,
  statId,
  data
) {
  return axios.put(`/api/modifyObjectiveSkill/${objectiveId}/${statId}`, data);
}
export function updateObjectiveStatByCoachAndPlayerApi(
  objectiveId,
  statId,
  data
) {
  return axios.put(`/api/modifyObjectiveStat/${objectiveId}/${statId}`, data);
}

export function updateStatObjectiveApi(id, data) {
  return axios.put(`/api/statisticObjectives/${id}`, data);
}

export function addObjectiveApi(data) {
  return axios.post("/api/statObjective/", data);
}

export function deleteStatObjectiveApi(id) {
  return axios.delete(`/api/statObjectives/${id}`);
}
export function addObjectiveStatByCoachAndPlayerApi(data) {
  return axios.post("/api/statObjective/", data);
}
export function addObjectiveSkillByCoachAndPlayerApi(id, data) {
  return axios.put(`/api/addObjectiveSkill/${id}`, data);
}
