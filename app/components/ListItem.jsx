import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const ListItem = ({
  image,
  IconComponent,
  onPress,
  renderRightActions,
  subTitle,
  title,
  addStyles,
}) => {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={1}
      overshootRight={false}
    >
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, { ...addStyles }]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={[styles.detailsContainer, addStyles?.detailsContainer]}>
            <Text style={[styles.title, addStyles?.text]}>{title}</Text>
            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    width: "100%",
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
});

export default ListItem;
