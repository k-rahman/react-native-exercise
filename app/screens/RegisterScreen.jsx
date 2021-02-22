import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import register from "../api/register";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(1).label("First Name"),
  lastname: Yup.string().required().min(1).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  phone: Yup.string().required().min(10).label("Phone Number"),
});

const RegisterScreen = ({ navigation }) => {
  const registerApi = useApi(register);
  const [error, setError] = useState();

  const handleSubmit = async user => {
    const { data, ok } = await registerApi.request(user);

    if (!ok) {
      if (data.message) setError(data.message);
      else setError(data[0]);

      alert(error);
      return;
    }

    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView>
      <ActivityIndicator visible={registerApi.loading} />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <Form
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phone: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        navigation={navigation}
      >
        <FormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="account"
          name="firstname"
          placeholder="FirstName"
        />
        <FormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="account"
          name="lastname"
          placeholder="LastName"
          style={{
            marginBottom: 15,
            borderBottomWidth: 0,
          }}
        />
        <FormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          icon="phone"
          name="phone"
          placeholder="Phone Number"
          keyboardType="number-pad"
          style={{
            marginBottom: 15,
            borderBottomWidth: 0,
          }}
        />
        <FormField
          autoCapittalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password" // ios
          style={{
            borderBottomWidth: 0,
          }}
        />
        <SubmitButton title="Register" />
      </Form>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
