import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Icon from "../components/Icon";
import AppText from "./AppText";

const backgroundColors =
  ["#e38a17", "#176fe3", "#e32517",
    "#d5e317", "#6fe317", "#17e38b",
    "#32a1ff", "#edb453", "#e76961"];

let num = 0;

const CategoryPickerItem = ({ item, onPress }) => {
  num < backgroundColors.length - 1 ? num++ : num = 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name={item.icon}
        size={80}
        backgroundColor={backgroundColors[num]}
      />
      <AppText style={styles.text}>{item.name}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%"
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center"
  }
});

export default CategoryPickerItem;
