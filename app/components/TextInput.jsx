import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const AppTextInput = ({ icon, style, ...otherProps }) => {
  return (
    <>
      <View style={[styles.container, style]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.secondaryLight}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={colors.medium}
          style={styles.textInput}
          {...otherProps}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderBottomWidth: 0.25,
    borderBottomColor: colors.medium,
    flexDirection: "row",
    padding: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
