import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import SearchResultScreen from "../screens/ItemsScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const SearchNav = () => (
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
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Search Result" component={SearchResultScreen} />
  </Stack.Navigator>
);

export default SearchNav;
