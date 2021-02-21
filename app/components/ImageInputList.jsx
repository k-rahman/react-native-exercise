import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ImageInput from "./ImageInput";

const ImageInputList = ({ imageUris = [], onRemoveImage, onAddImage }) => {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() =>
          scrollView.current.scrollToEnd({ animated: true })
        }
      >
        <View style={styles.container}>
          {imageUris.map(uri => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          {imageUris.length < 4 && (
            <ImageInput onChangeImage={uri => onAddImage(uri)} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
