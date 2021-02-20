import React from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../config/colors";

const AppText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        color: colors.black,
        fontSize: 18,
        fontFamily: "Avenir",
      },
      android: {
        color: colors.black,
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

export default AppText;
