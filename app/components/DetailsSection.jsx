import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

const DetailsSection = ({ Component, label, value, addStyles }) => {
  let longText;
  if (addStyles && "longText" in addStyles) {
    longText = addStyles.longText;
  }

  return (
    <View style={[styles.container, { ...addStyles }]}>
      <Text style={styles.label}>{label}</Text>
      {Component}
      {value && <Text style={[styles.value, { ...longText }]}>{value}</Text>}
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
