import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async authToken => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (e) {
    console.log("Error storing token");
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const getToken = async _ => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.log("Error getting token ", e);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.log("Error removing token ", e);
  }
};

export default {
  getUser,
  storeToken,
  getToken,
  removeToken,
};
