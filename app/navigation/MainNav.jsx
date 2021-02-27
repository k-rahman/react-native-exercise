import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import MainTabs from "../navigation/MainTabs";
import ItemDetailsScreen from "../screens/ItemDetailsScreen";

const Stack = createStackNavigator();

const HomeNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="itemDetails"
      component={ItemDetailsScreen}
      options={{
        headerTransparent: true,
        headerTitle: "",
        headerBackTitleVisible: false,
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
