import React, { useState } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import styled from "styled-components/native";

const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const RandomButton = ({ restaurants }) => {
  const [randomRestaurant, setRandomRestaurant] = useState(null);

  const generateRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomRestaurant = restaurants[randomIndex];
      setRandomRestaurant(randomRestaurant);
    }
  };
  
  const handlePress = () => {
    generateRandomRestaurant();
  };

  return (
    <ButtonContainer onPress={handlePress}>
      {randomRestaurant ? (
        <View>
          <Text> Tap again for a different fate</Text>
          <Text>{randomRestaurant.name}</Text>
          <Text>Rating: {randomRestaurant.rating}</Text>
          
          {/* ADD PRICE AND IMG LATER */}
        </View>
      ) : (
        <Image
          source={require("../../../assets/idc2.png")}
          style={{ width: 300, height: 300 }}
        />
      )}
    </ButtonContainer>
  );
};

export default RandomButton;
