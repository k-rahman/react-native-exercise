import React from "react";
import { Formik } from "formik";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "../AppText";
import colors from "../../config/colors";

const AppForm = ({
  navigation,
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ handleReset }) => (
        <>
          {React.useLayoutEffect(() => {
            navigation.setOptions({
              headerRight: () => (
                <TouchableOpacity
                  onPress={handleReset}
                  style={{ marginRight: 10 }}
                >
                  <AppText style={styles.text}>Reset</AppText>
                </TouchableOpacity>
              ),
            });
          }, [navigation])}

          {children}
        </>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  conttainer: {
    marginTop: 5,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "600",
  },
});
export default AppForm;
