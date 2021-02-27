import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import itemsScreen from "../screens/ItemsScreen";

const Stack = createStackNavigator();

const HomeNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={itemsScreen}
      options={{
        headerStyle: {
          backgroundColor: colors.primary,
          shadowOpacity: 10,
          shadowRadius: 10,
          shadowColor: colors.medium,
        },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    />
  </Stack.Navigator>
);
export default HomeNav;
