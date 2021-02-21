import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

const FormField = ({ name, value, ...otherProps }) => {
  const {
    errors,
    setFieldValue,
    values,
    touched,
    setFieldError,
  } = useFormikContext();

  useEffect(() => {
    if (value) setFieldValue(name, value.toString());
  }, [value]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => {
          setFieldValue(name, text);
          setFieldError(name, null);
        }}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FormField;
