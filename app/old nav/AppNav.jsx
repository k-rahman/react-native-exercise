import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNav from "../navigation/AccountNav";
import SearchNav from "../navigation/SearchNav";
import NewItemNav from "../navigation/NewItemNav";
import ItemsScreen from "../screens/ItemsScreen";

const Tab = createBottomTabNavigator();

const AppNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name="Home"
      component={ItemsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={40} />
        ),
      }}
    />
    <Tab.Screen
      name="List an item"
      component={NewItemNav}
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

export default AppNav;
