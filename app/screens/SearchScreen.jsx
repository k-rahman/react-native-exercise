import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Form,
  FormField,
  FormPicker,
  FormDatePicker,
  SearchBar,
} from "../components/forms";
import Button from "../components/Button";
import categoriesApi from "../api/categories";
import CategoryPickerItem from "../components/CategoryPickerItem";
import useApi from "../hooks/useApi";
import colors from "../config/colors";

const SearchScreen = ({ navigation }) => {
  const { response: categories, request: loadCategories } = useApi(
    categoriesApi
  );
  const [toggle, setToggle] = useState(false);
  const [filtersText, setfiltersText] = useState("+ show filters");

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = values => {
    navigation.navigate("Search Result", {
      ...values,
      from: values.from.toISOString(),
      to: values.to.toISOString(),
    });
  };

  return (
    <KeyboardAwareScrollView>
      <Form
        initialValues={{
          keyword: "",
          category: null,
          country: "",
          city: "",
          from: new Date("1/1/2021"),
          to: new Date(),
        }}
        onSubmit={handleSubmit}
        navigation={navigation}
      >
        <SearchBar name="keyword" placeholder="Search ..." />

        <Button
          title={filtersText}
          onPress={() => {
            setToggle(!toggle);
            toggle
              ? setfiltersText("+ show filters")
              : setfiltersText("- hide filters");
          }}
          addBtnStyles={{
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
          addTextStyles={{
            color: colors.secondary,
            fontSize: 13,
          }}
        />
        {toggle && (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View style={styles.countryGroup}>
              <FormField name="country" placeholder="Country" />
              <FormField
                name="city"
                placeholder="City"
                style={{ borderBottomWidth: 0 }}
              />
            </View>

            <FormPicker
              items={categories.data}
              name="category"
              numColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Categories"
              style={{ borderBottomWidth: 0 }}
            />

            <View style={styles.dateGroup}>
              <FormDatePicker name="from" placeholder="From" />
              <FormDatePicker
                name="to"
                placeholder="To"
                style={{ borderBottomWidth: 0 }}
              />
            </View>
          </View>
        )}
      </Form>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  countryGroup: {
    marginBottom: 15,
  },
  dateGroup: {
    marginTop: 15,
  },
});

export default SearchScreen;
