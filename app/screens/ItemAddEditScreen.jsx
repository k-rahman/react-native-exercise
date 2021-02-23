import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker,
  FormImagePicker,
  SubmitButton,
} from "../components/forms";
import categoriesApi from "../api/categories";
import CategoryPickerItem from "../components/CategoryPickerItem";
import deliveryTypesApi from "../api/deliveryTypes";
import itemsApi from "../api/items";
import UploadScreen from "./UploadScreen";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(5).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  country: Yup.string().required().min(1).label("Country"),
  city: Yup.string().required().min(1).label("City"),
  description: Yup.string().required().min(5).label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  deliveryType: Yup.object().required().nullable().label("Delivery Type"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const NewItemScreen = ({ navigation, route }) => {
  const [uploadVisible, setuploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);

  const { response: item, request: loadItemById } = useApi(
    itemsApi.getItemById
  );
  const { response: categories, request: loadCategories } = useApi(
    categoriesApi
  );
  const { response: deliveryTypes, request: loadDeliveryTypes } = useApi(
    deliveryTypesApi
  );

  const { error: addError, request: addItem } = useApi(itemsApi.addItem);
  const { error: editError, request: editItem } = useApi(itemsApi.editItem);

  useEffect(() => {
    if (route.params?.itemId) loadItemById(route.params.itemId);

    loadCategories();
    loadDeliveryTypes();
  }, [route.params?.itemId]);

  const handleSubmit = (data, { resetForm }) => {
    setProgress(0);
    setuploadVisible(true);

    if (route.params?.itemId) {
      editItem(data, route.params?.itemId, progress => setProgress(progress));
    } else {
      addItem(data, progress => setProgress(progress));
      resetForm();
    }

    if (addError || editError) {
      setuploadVisible(false);
      return alert("Could not save the item");
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        Alert.alert("Login to add an item", "", [
          {
            text: "Login",
            onPress: () =>
              navigation.navigate("Account", {
                screen: "Login",
                params: { screenName: "Add item" },
              }),
          },
          {
            text: "Cancel",
            onPress: () => navigation.navigate("Home"),
          },
        ]);
      }

      return () => {};
    }, [user])
  );

  return (
    <KeyboardAwareScrollView>
      <UploadScreen
        onDone={() => setuploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          country: "",
          city: "",
          description: "",
          category: null,
          deliveryType: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        navigation={navigation}
      >
        <FormImagePicker name="images" value={item.data?.images} />
        <View style={styles.titleGroup}>
          <FormField
            icon="text-short"
            name="title"
            maxLength={255}
            placeholder="Title"
            value={item.data?.title}
          />
          <FormField
            icon="tag-outline"
            keyboardType="numeric"
            name="price"
            maxLength={8}
            placeholder="Price"
            value={item.data?.price}
          />
          <FormField
            icon="text"
            name="description"
            numberOfLines={3}
            maxLength={255}
            multiline
            placeholder="Description"
            value={item.data?.description}
            style={{
              borderBottomWidth: 0,
            }}
          />
        </View>

        <View style={styles.categoryGroup}>
          <FormPicker
            icon="apps"
            items={categories.data}
            name="category"
            numColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Categories"
            value={item.data?.category}
          />
          <FormPicker
            icon="truck-fast-outline"
            items={deliveryTypes.data}
            name="deliveryType"
            placeholder="Delivery Types"
            value={item.data?.deliveryType}
            style={{
              borderBottomWidth: 0,
            }}
          />
        </View>
        <View style={styles.countryGroup}>
          <FormField
            icon="google-maps"
            name="country"
            placeholder="Country"
            value={item.data?.country}
          />
          <FormField
            icon="google-maps"
            name="city"
            placeholder="City"
            value={item.data?.city}
            style={{
              borderBottomWidth: 0,
            }}
          />
        </View>
        <SubmitButton title={item.data?.title ? "Edit item" : "Add item"} />
      </Form>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  titleGroup: {
    marginBottom: 15,
  },
  categoryGroup: {
    marginBottom: 15,
  },
  countryGroup: {
    marginBottom: 15,
  },
});

export default NewItemScreen;
