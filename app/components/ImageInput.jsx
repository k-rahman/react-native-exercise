import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const ImageInput = ({ onChangeImage, imageUri }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable premission to access image");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => {
            onChangeImage(null);
          },
        },
        {
          text: "No",
        },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) onChangeImage(result.uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={colors.secondaryLight}
            style={styles.icon}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    height: 100,
    overflow: "hidden",
    width: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
