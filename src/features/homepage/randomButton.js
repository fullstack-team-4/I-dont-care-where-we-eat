import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { RestaurantInfoCard } from '../screens/RestaurantComponent';

const ButtonContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    shadow-color: #000;
    shadow-opacity: 1;
    shadow-offset: 0px 2px;
    shadow-radius: 4px;
    elevation: 2;
    margin-top: 15px;
    max-height: 95%;
    position: relative;
`;


const RandomButton = ({ states }) => {
  const [restaurant, setRandomRestaurant] = useState(null);
  const generateRandomRestaurant = () => {
    if (states.restaurantData.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * states.restaurantData.length
      );
      const randomRestaurant = states.restaurantData[randomIndex];
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
            user_ratings_total={restaurant.user_ratings_total}
            isClosedTemporarily={restaurant.isClosedTemporarily}
            opening_hours={restaurant.opening_hours}
            vicinity={restaurant.vicinity}
            photos={restaurant.photos}
          />
           <TouchableOpacity activeOpacity={1} onPress={handlePress}>
            <View style={{ position: 'relative', marginLeft: 100, bottom: 20}}>
              <Image
                source={require("../../../assets/button-2.png")}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity activeOpacity={1} onPress={handlePress}>
          <Image
            source={require("../../../assets/idc2.png")}
            style={{ width: 300, height: 300, }}
          />
        </TouchableOpacity>
      )}
    </ButtonContainer>
  );
};

export default RandomButton;
