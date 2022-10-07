import axios from "axios";

export default axios.create({
  timeout: 60000,
  headers: {
    Authorization:
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("user") !== "null"
        ? `Bearer ${JSON.parse(localStorage.getItem("user"))}`
        : null,
  },
});
