import { create } from "apisauce";
import authStorage from "../auth/storage";

const api = create({
  baseURL: "https://kirppu-tori.herokuapp.com",
  // baseURL: "http://192.168.1.7:3200",
});

api.addAsyncRequestTransform(async request => {
  const token = await authStorage.getToken();
  if (!token) return;
  request.headers["Authorization"] = "Bearer " + token;
});

export default api;
