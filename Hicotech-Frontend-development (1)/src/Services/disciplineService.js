import axios from "../utils/axiosInstance";

function getDisciplinesApi() {
  return axios.get("/api/disciplines");
}
export default {
  getDisciplinesApi,
};
