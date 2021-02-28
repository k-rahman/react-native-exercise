import api from "./api";

const getUserInfo = _ => api.get("/users/me");

export default {
  getUserInfo,
};
