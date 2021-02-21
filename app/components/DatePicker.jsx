import React from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "./Text";

const DatePicker = ({ onChange, onPress, placeholder, show, style, value }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <View style={styles.iconGroup}>
          <MaterialCommunityIcons
            name="calendar"
            size={35}
            color={colors.secondaryLight}
            style={{ paddingLeft: 7 }}
          />
          <Text style={{ color: colors.medium, marginLeft: 5 }}>
            {placeholder}
          </Text>
        </View>
        <TextInput
          editable={false}
          placeholderTextColor={colors.medium}
          placeholder={placeholder}
          style={styles.textInput}
          value={`${value.toLocaleDateString()}`}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker value={value} display="default" onChange={onChange} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 0.25,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textInput: {
    flex: 1,
    color: colors.medium,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default DatePicker;
