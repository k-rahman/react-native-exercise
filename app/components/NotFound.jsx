import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import Text from "./Text";

const NotFound = ({ response, retry, params }) => {
  const [refreshing, setResfreshing] = useState();

  const handleRefreshing = async () => {
    await retry(params);
    setResfreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing} />
      }
    >
      <View style={styles.container}>
        {response.status === 404 ? (
          <>
            <Text style={styles.text}>{response.data.message}</Text>
            <LottieView
              autoPlay
              loop
              source={require("../assets/animations/not-found.json")}
              style={styles.animation}
            />
          </>
        ) : (
          <>
            <Text style={styles.text}>Oops, something went wrong!</Text>
            <Text style={styles.text}>please retry again later.</Text>
            <LottieView
              autoPlay
              loop
              source={require("../assets/animations/oops.json")}
              style={styles.animation}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  animation: {
    height: 300,
    width: 300,
  },
});

export default NotFound;
