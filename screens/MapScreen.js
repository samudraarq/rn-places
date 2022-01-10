import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const { initialLocation, readonly } = props.route.params;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useLayoutEffect(() => {
    if (readonly) {
      return;
    }
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocationHandler}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, selectedLocation, readonly]);

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", {
      mapPickedLocation: selectedLocation,
    });
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
