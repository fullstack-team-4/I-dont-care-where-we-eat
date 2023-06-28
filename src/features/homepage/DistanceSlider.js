import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

const DistanceSlider = () => {
  const [distance, setDistance] = useState(5);

  return (
    <View style={{ flex: 1, alingItems: "strech", justifyContent: "center" }}>
      <Text style={{ textAlign: "center" }}>{distance} miles</Text>
      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={distance}
        onValueChange={(value) => setDistance(value)}
      />
    </View>
  );
};

export default DistanceSlider;
