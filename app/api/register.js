import api from "./api";

export default user => api.post("/register", user);
