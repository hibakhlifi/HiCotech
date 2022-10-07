import axios from "../utils/axiosInstance";

function getUsersApi() {
  return axios.get(`/api/users`);
}

function getUserApi(id) {
  return axios.get(`/api/users/${id}`);
}

function updateUserApi(id, data) {
  return axios.put(`/api/users/${id}`, data);
}

function addUserApi(data) {
  return axios.post("/api/users/", data);
}

function deleteUserApi(id) {
  return axios.delete(`/api/users/${id}`);
}
export default {
  getUserApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
};
