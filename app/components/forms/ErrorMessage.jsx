import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";
import { useState } from "react";

const ErrorMessage = ({ error, visible, style }) => {
  if (!error) return null;

  const [show, setShow] = useState(false);

  return (
    <>
      {visible && (
        <View style={[styles.container, style]}>
          {show && <Text style={styles.error}>{error}</Text>}
          <TouchableWithoutFeedback onPress={() => setShow(!show)}>
            <AntDesign
              name="exclamationcircle"
              color={colors.danger}
              size={18}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    flexDirection: "row",
    position: "absolute",
    right: 10,
  },
  error: {
    color: colors.danger,
    fontSize: 10,
  },
  icon: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
});

export default ErrorMessage;
