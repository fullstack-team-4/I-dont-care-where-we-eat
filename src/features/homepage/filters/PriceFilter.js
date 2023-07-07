import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PriceFilter = ({ onFilterApply }) => {
    const prices = {
        $: 0,
        $$: 1,
        $$$: 2,
        $$$$: 3,
    };
    const [selectedPrice, setSelectedPrice] = useState(null);

    const selectPrice = (selected) => {
        setSelectedPrice(selected);
    };

    const applyFilter = () => {
        // console.log(`Filter applied with price: ${prices[selectedPrice]}`);
        onFilterApply(prices[selectedPrice]);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Price</Text>
      <View style={styles.priceContainer}>
      {Object.entries(prices).map(([price, index]) => (
          <View
            key={index}
            style={[
              styles.priceItemWrapper,
              selectedPrice === price ? styles.selected : styles.unselected,
            ]}
          >
            <TouchableOpacity
              style={styles.priceButton}
              onPress={() => selectPrice(price)}
            >
              <Text style={styles.buttonText}>{price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setSelectedPrice(null)}
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
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  priceItemWrapper: {
    margin: 5,
    borderRadius: 10,
  },
  priceButton: {
    margin: 5,
    width: 65,
    height: 40,
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

export default PriceFilter;
