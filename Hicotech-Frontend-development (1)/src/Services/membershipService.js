import axios from "../utils/axiosInstance";

export function updateMembership(id, data) {
  return axios.put(`/api/subscription/${id}`, data);
}
export function getMembership(id) {
  return axios.get(`/api/subscription/${id}`);
}
