import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserItemsScreen from "../screens/UserItemsScreen";
import NewItemScreen from "../screens/NewItemScreen";

const Stack = createStackNavigator();

const AccountNav = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      mode={"modal"}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          shadowOpacity: 10,
          shadowRadius: 10,
          shadowColor: colors.medium,
        },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        animationEnabled: false,
        transitionConfig: () => ({
          transitionSpec: {
            duration: 0,
            timing: 0,
          },
        }),
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="My items" component={UserItemsScreen} />
          <Stack.Screen name="Edit item" component={NewItemScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AccountNav;
