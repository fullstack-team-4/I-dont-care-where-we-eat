import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const cuisine = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "French",
  "Thai",
  "BBQ",
  "Dessert",
  "Pizza",
  "Seafood",
  "Suchi",
  "Steak",
];

const CuisineFilter = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const selectCuisine = (selected) => {
    if (selectedCuisines.includes(selected)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== selected));
    } else {
      setSelectedCuisines([...selectedCuisines, selected]);
    }
  };

  const renderCuisine = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cuisineItem,
        selectedCuisines.includes(item) && styles.selected,
      ]}
      onPress={() => selectCuisine(item)}
    >
      <Text style={styles.cuisineText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cuisine}
        renderItem={renderCuisine}
        keyExtractor={(item) => item}
        numColumns={3}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Reset" onPress={() => setSelectedCuisines([])} />
        <Button title="Apply filter" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cuisineItem: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "blue",
  },
  cuisineText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default CuisineFilter;
