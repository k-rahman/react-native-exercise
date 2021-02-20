import api from "./api";

const login = (username, password) =>
  api.post(
    "/auth",
    {},
    {
      auth: {
        username,
        password,
      },
    }
  );

export default {
  login,
};
