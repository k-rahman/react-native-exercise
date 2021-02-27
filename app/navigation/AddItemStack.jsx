import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "../auth/context";
import colors from "../config/colors";
import NewItemScreen from "../screens/ItemAddEditScreen";

const Stack = createStackNavigator();

const NewItemNav = () => {
  return (
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
      <Stack.Screen name="List New Item" component={NewItemScreen} />
    </Stack.Navigator>
  );
};
export default NewItemNav;
