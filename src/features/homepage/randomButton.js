import React, { useState } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { GOOGLE_MAPS_API_KEY } from '@env'

const ButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 2;
`;


const RandomButton = ({ restaurants }) => {
  const [restaurant, setRandomRestaurant] = useState(null);

  const generateRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const restaurant = restaurants[randomIndex];
      setRandomRestaurant(restaurant);
    }
  };
  
  const handlePress = () => {
    console.log('choosing fate')
    generateRandomRestaurant();
  };

  return (
    <ButtonContainer>
      {restaurant ? (
         <View>
         <ScrollView horizontal>
           {restaurant.photos.map((photo, index) => (
             <Image
               key={index}
               source={{
                 uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`,
               }}
               style={{ width: 300, height: 300, resizeMode: 'contain', marginRight: 8,
                 shadowColor: 'red', shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1 }, shadowRadius: 4,
               }}
             />   
        ))} 
      </ScrollView>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{restaurant.name}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{restaurant.vicinity}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rating: {restaurant.rating}/5 Reviews:{restaurant.user_ratings_total}</Text>
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
