import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import colors from "../config/colors";
import itemsApi from "../api/items";
import NotFound from "../components/NotFound";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import { useState } from "react";

const itemsScreen = ({ navigation, route }) => {
  const [refresh, setRefresh] = useState(false);
  const { data: items, error, loading, request: loadItems } = useApi(
    itemsApi.getItems
  );

  useEffect(() => {
    loadItems(route.params);
  }, []);

  return (
    <View style={styles.container}>
      {items.code === "404" && <NotFound message={items.message} />}
      {error && (
        <>
          <AppText>Couldnt retrieve the listings.</AppText>
          <AppButton title="Retry" onPress={loadItems} />
        </>
      )}
      <ActivityIndicator visible={!refresh && loading} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        refreshing={refresh}
        onRefresh={() => loadItems(route.params)}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={`${item.price} €`}
            date={new Date(item.createdAt)
              .toLocaleString("fi-FI", {
                timeStyle: "short",
                dateStyle: "long",
              })
              .replace("2021", "")
              .replace("klo", "")}
            image={item.images[0]}
            onPress={() => {
              route.params
                ? navigation.navigate("SearchItemDetails", item)
                : navigation.navigate("ItemDetails", item);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});

export default itemsScreen;
