import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import navigationTheme from "./app/navigation/navigationTheme";
import MainNav from "./app/navigation/MainNav";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async _ => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onError={e => console.log(e)}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        <MainNav />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
