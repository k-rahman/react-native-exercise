import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import colors from "../config/colors";
import itemsApi from "../api/items";
import NotFound from "../components/NotFound";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";

const itemsScreen = ({ navigation, route }) => {
  const [refresh, setRefresh] = useState(false);
  const { response, error, loading, request: loadItems } = useApi(
    itemsApi.getItems
  );
  const { data: items } = response;

  useFocusEffect(
    useCallback(() => {
      loadItems(route.params);

      return () => {};
    }, [])
  );

  return (
    <Screen style={styles.container}>
      {error ? (
        <>
          <NotFound
            response={response}
            retry={loadItems}
            params={route.params}
          />
          <ActivityIndicator visible={!refresh && loading} />
        </>
      ) : (
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
                navigation.navigate("itemDetails", item);
              }}
            />
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});

export default itemsScreen;
