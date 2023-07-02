import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PriceFilter = () => {
  const prices = ["$", "$$", "$$$", "$$$$"];
  const [selectedPrice, setSelectedPrice] = useState(null);

  const selectPrice = (selected) => {
    setSelectedPrice(selected);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {prices.map((price, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: price === selectedPrice ? "blue" : "gray",
            marginBottom: 10,
            borderRadius: 10,
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => selectPrice(price)}
        >
          <Text style={{ color: "white" }}>{price}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          backgroundColor: "gray",
          marginBottom: 10,
          borderRadius: 10,
          padding: 10,
          alignItems: "center",
        }}
        onPress={() => setSelectedPrice(null)}
      >
        <Text style={{ color: "white" }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PriceFilter;
