import React, { useState, useContext } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import {
  Form,
  FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import AuthContext from "../auth/context";
import authApi from "../api/auth";
import authStorage from "../auth/storage";
import Text from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
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

    if (route.params?.screenName) {
      navigation.navigate(route.params.screenName);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ActivityIndicator visible={loginApi.loading} />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        navigation={navigation}
      >
        <ErrorMessage
          error={loginFailed}
          visible={loginFailed}
          style={{ position: "relative", alignSelf: "flex-end" }}
        />
        <FormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress" // ios
        />
        <FormField
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
      </Form>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        activeOpacity={0.5}
      >
        <Text style={styles.createAccount}>Create Account?</Text>
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
