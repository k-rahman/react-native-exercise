import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";

import Text from "./Text";

const storageServer = "https://abdelrahman.ddns.net/";

const Card = ({ title, subTitle, date, image, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: `${storageServer}${image}` }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subContainer}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 3,
    backgroundColor: colors.white,
    marginBottom: 3,
    overflow: "hidden",
  },
  detailsContainer: {
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginVertical: 5,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: 125,
    height: 125,
  },
  subTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
  },
  date: {
    marginTop: 7,
    fontSize: 10,
  },
});

export default Card;
