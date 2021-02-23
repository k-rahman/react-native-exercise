import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";

const AccountScreen = ({ navigation }) => {
  const { user: userInfo, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Yes",
        onPress: () => {
          authStorage.removeToken();
          setUser(null);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={`${userInfo?.user.firstname} ${userInfo?.user.lastname}`}
          subTitle={userInfo?.user.email}
          image={require("../assets/avatar.png")}
        />
      </View>

      <View style={styles.container}>
        <ListItem
          title="My Items"
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.secondaryLight}
            />
          }
          onPress={() => navigation.navigate("My items")}
        />
        <MaterialCommunityIcons
          style={styles.chevron}
          name="chevron-right"
          size={20}
        />
      </View>
      <View style={styles.logout}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="tomato" />}
          onPress={handleLogout}
        />
        <MaterialCommunityIcons
          style={styles.chevron}
          name="chevron-right"
          size={20}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: "row",
  },
  screen: {
    backgroundColor: colors.light,
  },
  logout: {
    flexDirection: "row",
  },
  chevron: {
    alignSelf: "center",
    position: "absolute",
    right: 15,
  },
});

export default AccountScreen;
