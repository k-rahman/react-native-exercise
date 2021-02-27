import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const LoggedOutStack = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowColor: colors.medium,
      },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default LoggedOutStack;
