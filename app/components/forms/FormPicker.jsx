import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

const FormPicker = ({
  items,
  name,
  numColumns,
  PickerItemComponent,
  placeholder,
  value,
  ...otherProps
}) => {
  const {
    errors,
    setFieldError,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();

  useEffect(() => {
    if (value) setFieldValue(name, value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Picker
        data={items}
        onSelectItem={item => {
          setFieldValue(name, item);
          setFieldError(name, false);
        }}
        numColumns={numColumns}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        {...otherProps}
      />

      <ErrorMessage
        error={errors[name]}
        visible={touched[name]}
        style={{ right: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FormPicker;
