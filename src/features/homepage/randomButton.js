import React, { useState } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components/native";
import { PLACES_KEY } from '@env';

const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const RandomButton = ({ onPress, restaurants }) => {
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
    console.log('this is handlepress');
  };

  return (
    <ButtonContainer onPress={handlePress}>
      <Image
        source={require("../../../assets/idc2.png")}
        style={{ width: 300, height: 300 }}
      />
    </ButtonContainer>
  );
};

export default RandomButton;
