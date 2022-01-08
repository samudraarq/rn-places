import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async () => {
    const status = await ImagePicker.requestCameraPermissionsAsync();
    if (!status.granted) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions",
        [{ text: "Okay" }]
      );
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imageSelector}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imageSelector: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
