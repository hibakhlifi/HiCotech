import axios from "../utils/axiosInstance";

export function getAllEventApi(data) {
  return axios.get("/api/events", { params: data });
}
export function getEventApi(id) {
  return axios.get(`/api/events/${id}`);
}

export function updateEventApi(id, data) {
  return axios.put(`/api/events/${id}`, data);
}

export function addEventApi(data) {
  return axios.post("/api/events/", data);
}

export function deleteEventApi(id) {
  return axios.delete(`/api/events/${id}`);
}
