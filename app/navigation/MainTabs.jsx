import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNav from "./AccountNav";
import SearchNav from "./SearchNav";
import AddItemStack from "./AddItemStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={40} />
        ),
      }}
    />
    <Tab.Screen
      name="Add item"
      component={AddItemStack}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" color={color} size={40} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNav}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={40} />
        ),
        unmountOnBlur: true,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchNav}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={40} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;
