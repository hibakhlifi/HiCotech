import axios from "../utils/axiosInstance";

export function getAllInvitationApi(data) {
  return axios.get("/api/invitations", { params: data });
}
export function getInvitationApi(id) {
  return axios.get(`/api/invitations/${id}`);
}

export function updateInvitationApi(id, data) {
  return axios.put(`/api/invitations/${id}`, data);
}

export function addInvitationApi(data) {
  return axios.post("/api/invitations/", data);
}

export function deleteInvitationApi(id) {
  return axios.delete(`/api/invitations/${id}`);
}
