import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { RestaurantInfoCard } from '../screens/RestaurantComponent';

const ButtonContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    border-radius: 8px;

    shadow-color: #000;
    shadow-opacity: 0.5;
    shadow-offset: 0px 2px;
    shadow-radius: 4px;
    elevation: 2;
`;

const ChangeFateText = styled(Text)`
    margin-top: 30px;
    font-size: 16px;
    font-weight: bold;
    color: red;
`;

const RandomButton = ({ restaurants }) => {
    const [restaurant, setRandomRestaurant] = useState(null);
    const generateRandomRestaurant = () => {
        if (restaurants.length > 0) {
            const randomIndex = Math.floor(Math.random() * restaurants.length);
            const randomRestaurant = restaurants[randomIndex];
            setRandomRestaurant(randomRestaurant);
        }
    };

  const handlePress = () => {
    console.log('Choosing fate');
    generateRandomRestaurant();
  };

  return (
    <ButtonContainer>
      {restaurant ? (
        <View>
          <RestaurantInfoCard
            name={restaurant.name}
            rating={restaurant.rating}
            isClosedTemporarily={restaurant.isClosedTemporarily}
            opening_hours={restaurant.opening_hours}
            vicinity={restaurant.vicinity}
            photos={restaurant.photos}
          />
          <ChangeFateText onPress={handlePress}>Click here to change your fate ¯\_(ツ)_/¯ </ChangeFateText>
        </View>
      ) : (
        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
          <Image
            source={require("../../../assets/idc2.png")}
            style={{ width: 300, height: 300 }}
          />
        </TouchableOpacity>
      )}
    </ButtonContainer>
  );
};

export default RandomButton;
