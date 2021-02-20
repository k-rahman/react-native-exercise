import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ItemsScreen from "../screens/ItemsScreen";
import colors from "../config/colors";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

const Stack = createStackNavigator();

const HomeNav = () => (
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
      gestureEnabled: true,
      gestureDirection: "horizontal",
    }}
  >
    <Stack.Screen name="Home" component={ItemsScreen} />
    <Stack.Screen
      name="ItemDetails"
      component={ItemDetailsScreen}
      options={{
        headerTransparent: true,
        headerTitle: "",
        headerBackTitle: "",
        headerBackImage: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.white}
          />
        ),
        gestureEnabled: true,
      }}
    />
  </Stack.Navigator>
);
export default HomeNav;
