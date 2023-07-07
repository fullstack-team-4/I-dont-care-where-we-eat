import React, { useState } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { GOOGLE_MAPS_API_KEY } from '@env';
import CuisineFilter from "./filters/CuisineFilter";

const ButtonContainer = styled(View)`
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

// handleRestaurantSearch = () => {
//   const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
//   const location = `location=${userLocation.latitude},${userLocation.longitude}`;
//   const radius = '&radius=2000';
//   const type = '&keyword=restaurant';
//   const key = `&key=${GOOGLE_MAPS_API_KEY}`;
//   const restaurantSearchUrl = url + location + radius + type + key;

//   fetch(restaurantSearchUrl)
//     .then(response => response.json())
//     .then(result => {
//       // Update the restaurantData state with the fetched data
//       setRestaurantData(result.results);
//     })
//     .catch(error => {
//       console.error('Error fetching restaurant data:', error);
//       Alert.alert('Error fetching restaurant data');
//     });
// };

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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{restaurant.name}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{restaurant.vicinity}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rating: {restaurant.rating}/5</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Reviews: {restaurant.user_ratings_total}</Text>
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