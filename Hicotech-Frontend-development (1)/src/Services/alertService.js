import axios from "../utils/axiosInstance";

function getAlertsApi(data) {
  return axios.get("/api/coach/alerts", { params: data });
}
function updateAlertsApi(id, data) {
  return axios.put(`/api/coach/alerts/${id}`, data);
}

export default {
  getAlertsApi,
  updateAlertsApi,
};
