import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";

import AppText from "./AppText";

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
          <AppText style={styles.title}>{title}</AppText>
          <View style={styles.subContainer}>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
            <AppText style={styles.date}>{date}</AppText>
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
