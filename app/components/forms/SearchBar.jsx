import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TextInput from "../TextInput";
import colors from "../../config/colors";

const SearchBar = ({ name, placeholder }) => {
  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
  } = useFormikContext();

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setFieldValue(name, text)}
        value={values[name]}
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        style={styles.searchBox}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="magnify" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
  },
  searchBox: {
    flex: 5,
    borderWidth: 0.5,
    padding: 11,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.secondaryLight,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
    justifyContent: "center",
    padding: 11,
  },
});

export default SearchBar;
