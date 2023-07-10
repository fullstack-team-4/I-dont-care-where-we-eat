import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { GOOGLE_MAPS_API_KEY } from '@env';

const ButtonContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
  elevation: 2;
`;

const RestaurantImage = styled(Image)`
  width: 300px;
  height: 300px;
  resize-mode: contain;
  margin-right: 8px;
  shadow-color: red;
  shadow-opacity: 0.5;
  shadow-offset: 1px 1px;
  shadow-radius: 4px;
`;

const ChangeFateText = styled(Text)`
  margin-top: 30px;
  font-size: 16px;
  font-weight: bold;
  color: red;
`;

const RandomButton = ({
  restaurants,
  cuisineFilters,
  priceFilters,
  ratingFilter,
  distanceFilter,
}) => {
  const [restaurant, setRandomRestaurant] = useState(null);

  const generateRandomRestaurant = () => {
    let filteredRestaurants = restaurants;

    if (cuisineFilters.length > 0) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        cuisineFilters.includes(restaurant.cuisine)
      );
    }
    // distance price open stuff later

    if (filteredRestaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
      const randomRestaurant = filteredRestaurants[randomIndex];
      setRandomRestaurant(randomRestaurant);
    }
  };

  const handlePress = () => {
    console.log('Choosing fate');
    generateRandomRestaurant();
  };

  useEffect(() => {
    generateRandomRestaurant();
  }, [cuisineFilters, priceFilters, ratingFilter, distanceFilter, restaurants]);

  return (
    <ButtonContainer>
      {restaurant ? (
        <View>
          <ScrollView horizontal>
            {restaurant.photos.map((photo, index) => (
              <RestaurantImage
                key={index}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`,
                }}
              />
            ))}
          </ScrollView>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{restaurant.name} ({restaurant.opening_hours.open_now ? 'Open' : 'Closed'})</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{restaurant.vicinity}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rating: {restaurant.rating} / 5     ({restaurant.user_ratings_total})</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>price level:{restaurant.price_level}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>distance: {restaurant.distance}</Text>
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
