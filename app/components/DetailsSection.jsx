import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

const DetailsSection = ({ Component, label, value, addStyles }) => {
  let longText;
  if (addStyles && "longText" in addStyles) {
    longText = addStyles.longText;
  }

  return (
    <View style={[styles.container, { ...addStyles }]}>
      <AppText style={styles.label}>{label}</AppText>
      {Component}
      {value && (
        <AppText style={[styles.value, { ...longText }]}>{value}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  label: {
    fontSize: 15,
    fontWeight: "100",
  },
  value: {
    fontSize: 14,
    fontWeight: "400",
  },
});

export default DetailsSection;
