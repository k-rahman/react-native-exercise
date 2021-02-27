import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import NewItemScreen from "../screens/ItemAddEditScreen";
import UserItemsScreen from "../screens/ItemsMyScreen";

const Stack = createStackNavigator();

const LoggedInStack = () => (
  <Stack.Navigator
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
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="My items" component={UserItemsScreen} />
    <Stack.Screen name="Edit item" component={NewItemScreen} />
  </Stack.Navigator>
);

export default LoggedInStack;
