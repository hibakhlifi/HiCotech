import axios from "../utils/axiosInstance";

function getChallengesApi(data) {
  return axios.get("/api/defis", { params: data });
}
export default {
  getChallengesApi,
};
