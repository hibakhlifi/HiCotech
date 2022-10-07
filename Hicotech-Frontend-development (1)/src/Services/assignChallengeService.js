import axios from "../utils/axiosInstance";

function AssignChallengeApi(data) {
  return axios.post("/api/assignerdefi", data);
}
function updateChallengeApi(id, data) {
  return axios.put(`/api/player/defi/marquerFini/${id}`, data);
}
function getCoachAssignedChallengesApi(data) {
  return axios.get("/api/coach/defis/assignes", { params: data });
}
function getPlayerAssignedChallengesApi(data) {
  return axios.get("/api/player/defis/assignes", { params: data });
}

export default {
  AssignChallengeApi,
  updateChallengeApi,
  getCoachAssignedChallengesApi,
  getPlayerAssignedChallengesApi,
};
