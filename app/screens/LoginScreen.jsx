import React, { useState, useContext } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import AuthContext from "../auth/context";
import authApi from "../api/auth";
import authStorage from "../auth/storage";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen = ({ navigation, route }) => {
  const { setUser } = useContext(AuthContext);
  const loginApi = useApi(authApi.login);
  const [loginFailed, setLoginFailed] = useState(""); // if true show message

  const handleSubmit = async ({ email, password }) => {
    const { data, ok } = await loginApi.request(email, password);

    if (!ok) return setLoginFailed(data.message);

    setLoginFailed("");
    setUser(jwtDecode(data.token));
    authStorage.storeToken(data.token);
  };

  return (
    <KeyboardAwareScrollView>
      <ActivityIndicator visible={loginApi.loading} />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        navigation={navigation}
      >
        <ErrorMessage error={loginFailed} />
        <AppFormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress" // ios
        />
        <AppFormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password" // ios
          style={{ borderBottomWidth: 0 }}
        />
        <SubmitButton title="Login" />
      </AppForm>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        activeOpacity={0.5}
      >
        <AppText style={styles.createAccount}>Create Account?</AppText>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  createAccount: {
    alignSelf: "center",
    marginTop: 15,
    fontSize: 17,
    fontWeight: "bold",
    color: colors.secondaryLight,
  },
});

export default LoginScreen;
