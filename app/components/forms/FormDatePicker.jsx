import React, { useState } from "react";
import { useFormikContext } from "formik";

import DatePicker from "../DatePicker";
import { Platform } from "react-native";

const FormDatePicker = ({ name, placeholder, style }) => {
  const { values, setFieldValue } = useFormikContext();
  const [show, setShow] = useState(false);

  const handleChange = (event, date) => {
    const selectedDate = date || values[name];
    setShow(Platform.OS === "ios");
    setFieldValue(name, selectedDate, false);
  };

  const handlePress = () => {
    Platform.OS === "ios" && show === true ? setShow(false) : setShow(true);
  };

  return (
    <DatePicker
      value={values[name]}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      onPress={handlePress}
      show={show}
    />
  );
};

export default FormDatePicker;
