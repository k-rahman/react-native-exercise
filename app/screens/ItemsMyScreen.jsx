import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import itemsApi from "../api/items";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemAction from "../components/ListItemAction";
import NotFound from "../components/NotFound";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";

const storageServer = "https://abdelrahman.ddns.net/";

const UserItemsScreen = ({ navigation }) => {
  const { response, error, loading, request: loadItems } = useApi(
    itemsApi.getUserItems
  );
  const { data: items } = response;
  const { request: deleteItem } = useApi(itemsApi.deleteItem);

  useEffect(() => {
    loadItems();
  }, []);
  const handleItemDelete = item => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: async () => {
          await deleteItem(item.id);
          loadItems();
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      {error ? (
        <>
          <NotFound response={response} retry={loadItems} />
          <ActivityIndicator visible={loading} />
        </>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.title}
                subTitle={`$${item.price}`}
                image={{ uri: `${storageServer}${item.images[0]}` }}
                renderRightActions={_ => {
                  return (
                    <>
                      <ListItemAction
                        iconName="trash-can-outline"
                        backgroundColor={colors.danger}
                        onPress={_ => handleItemDelete(item)}
                      />
                      <ListItemAction
                        iconName="playlist-edit"
                        backgroundColor={colors.secondary}
                        onPress={_ => {
                          navigation.navigate("Edit item", { itemId: item.id });
                        }}
                      />
                    </>
                  );
                }}
              />
            );
          }}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default UserItemsScreen;
