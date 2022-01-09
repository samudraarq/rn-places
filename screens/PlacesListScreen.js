import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
