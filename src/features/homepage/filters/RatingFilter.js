import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RatingFilter = ({ onFilterApply }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    loadSelectedRating();
  }, []);

  const loadSelectedRating = async () => {
    try {
      const rating = await AsyncStorage.getItem("selectedRating");
      if (rating !== null) {
        setSelectedRating(parseInt(rating));
      }
    } catch (error) {
      console.log("Error loading selected rating:", error);
    }
  };

  const saveSelectedRating = async (rating) => {
    try {
      if (rating === null) {
        await AsyncStorage.removeItem("selectedRating");
      } else {
        await AsyncStorage.setItem("selectedRating", rating.toString());
      }
    } catch (error) {
      console.log("Error saving selected rating:", error);
    }
  };

  const selectRating = (rating) => {
    setSelectedRating(rating);
  };

  useEffect(() => {
    saveSelectedRating(selectedRating);
  }, [selectedRating]);

  const applyFilter = () => {
    onFilterApply(selectedRating);
    // console.log(`Filter applied with rating: ${selectedRating}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rating</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating, index) => (
          <View
            key={index}
            style={[
              styles.ratingWrapper,
              rating <= selectedRating ? styles.selected : styles.unselected,
            ]}
          >
            <View style={styles.ratingButton}>
              <TouchableOpacity onPress={() => selectRating(rating)}>
                <MaterialIcons name="star" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setSelectedRating(null)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    color: "maroon",
    marginRight: "auto",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Change this to 'space-around' to evenly distribute items
    marginBottom: 15,
  },
  ratingWrapper: {
    margin: 5,
    borderRadius: 10,
    width: 60, // Adjust the width to fit the screen
    height: 60, // Adjust the height to fit the screen
    backgroundColor: "rgba(128, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingButton: {
    width: 50, // Adjust this size accordingly
    height: 50, // Adjust this size accordingly
    borderRadius: 10,
    backgroundColor: "#696969",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "rgba(128, 0, 0, 0.8)",
  },
  unselected: {
    backgroundColor: "#696969",
  },
  buttonText: {
    color: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "maroon",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: "auto",
    marginRight: 50,
    marginBottom: 25,
  },
  applyButton: {
    backgroundColor: "maroon",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: "auto",
    marginBottom: 25,
  },
});

export default RatingFilter;
