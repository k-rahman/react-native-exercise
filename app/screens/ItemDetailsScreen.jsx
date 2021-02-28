import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Text from "../components/Text";
import DetailsSection from "../components/DetailsSection";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";

const storageServer = "https://abdelrahman.ddns.net/";

const ItemDetailsScreen = ({ route }) => {
  const item = route.params;

  return (
    <ScrollView>
      <FlatList
        data={item.images}
        keyExtractor={image => image}
        horizontal
        snapToInterval={styles.image.width + 1}
        decelerationRate="fast"
        ItemSeparatorComponent={() => (
          <ListItemSeparator addStyles={{ width: 1 }} />
        )}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: `${storageServer}${item}` }}
          />
        )}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subTextContainer}>
          <Text style={styles.date}>
            {new Date(item.createdAt)
              .toLocaleString("fi-FI", {
                dateStyle: "long",
                timeStyle: "short",
              })
              .replace(/202./g, "")
              .replace("klo", "")}
          </Text>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </View>
      <DetailsSection label="Category" value={item.category.name} />
      <DetailsSection label="Delivery Type" value={item.deliveryType.name} />
      <DetailsSection label="Country" value={item.country} />
      <DetailsSection label="City" value={item.city} />
      <DetailsSection
        label="Description"
        value={item.description}
        addStyles={{
          longText: {
            paddingTop: 10,
            fontSize: 16,
          },
          flexDirection: "column",
        }}
      />
      <DetailsSection
        label="Seller"
        addStyles={{
          flexDirection: "column",
          alignItems: "center",
        }}
        Component={
          <ListItem
            image={require("../assets/avatar.png")}
            title={item.sellerName}
            subTitle={item.contactInfo}
            addStyles={{
              paddingTop: 20,
              flexDirection: "column",
              alignItems: "center",
              alignText: "center",
              text: {
                textAlign: "center",
              },
              detailsContainer: {
                alignItems: "center",
              },
            }}
          />
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("screen").width,
    height: 300,
  },
  textContainer: {
    backgroundColor: colors.light,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.medium,
    paddingTop: 17,
    paddingBottom: 5,
    paddingHorizontal: 13,
  },
  date: {
    fontSize: 13,
  },
  price: {
    fontSize: 14,
  },
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 29,
    fontWeight: "500",
    color: colors.black,
    paddingBottom: 3,
  },
});

export default ItemDetailsScreen;
