import React from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";

const ImageSelector = () => {
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
    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imageSelector}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
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
