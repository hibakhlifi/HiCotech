import axios from "../utils/axiosInstance";

export function getAllStatisticsApi(discipline) {
  return axios.get(`/api/all/statistics/${discipline}`, {
    params: { discipline },
  });
}
export function getAllSkillsApi(discipline) {
  return axios.get(`/api/all/skills/${discipline}`, {
    params: { discipline },
  });
}
export function deleteStatisticsApi(statisticId) {
  return axios.delete(`/api/statistic/${statisticId}`);
}
export function updateStatisticsApi(statisticId, data) {
  return axios.put(`/api/statistic/${statisticId}`, data);
}
export function addStatisticApi(data) {
  return axios.post("/api/createStatistic", data);
}
