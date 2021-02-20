import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ addBtnStyles, addTextStyles, title, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { ...addBtnStyles }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { ...addTextStyles }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    justifyContent: "center",
    marginVertical: 5,
    padding: 13,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
