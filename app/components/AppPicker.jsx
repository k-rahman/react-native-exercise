import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";
import PickerItem from "./PickerItem";

const AppPicker = ({
  data,
  icon,
  onSelectItem,
  numColumns = 1,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, style]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.secondaryLight}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.name}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide" statusBarTranslucent>
        <Screen>
          <View style={styles.closeIconContainer}>
            <MaterialCommunityIcons
              name="close"
              size={25}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.medium,
    flexDirection: "row",
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  closeIconContainer: {
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
});

export default AppPicker;
