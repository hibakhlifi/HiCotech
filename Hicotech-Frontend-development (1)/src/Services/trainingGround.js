import axios from "../utils/axiosInstance";

function addTrainingGroudApi(data) {
  return axios.post("/api/createTrainingGround", data);
}
function getTrainingGroudsApi(id) {
  return axios.get(`/api/getTrainingGrounds/${id}`);
}
function deleteTrainingGroudApi(id) {
  return axios.delete(`/api/deleteTrainingGround/${id}`);
}
function updateTrainingGroudApi(id, data) {
  return axios.post(`/api/updateTrainingGround/${id}`, data);
}
export default {
  getTrainingGroudsApi,
  addTrainingGroudApi,
  updateTrainingGroudApi,
  deleteTrainingGroudApi,
};
