import React, { useState } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView, Linking } from "react-native";
import styled from "styled-components/native";
import { GOOGLE_MAPS_API_KEY } from '@env';
import star from "../../../assets/star";
import { SvgXml } from "react-native-svg";

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

const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InfoText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const LinkIcon = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const RowContainer = styled(View)`
  flex-direction: row;
  align-items: center;
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

  const openGoogleMaps = () => {
    if (restaurant && restaurant.reference) {
      const url = `https://www.google.com/maps/place/?q=place_id:${restaurant.vicinity}`;
      // Open the URL in a new window or tab
      Linking.openURL(url);
    }
  };

  const openPhoneNumber = () => {
    if (restaurant && restaurant.formatted_phone_number) {
      const phoneNumber = restaurant.formatted_phone_number;
      // Open the phone number in the device's dialer
      // Adjust this based on your platform (iOS/Android)
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const getPriceLevel = (level) => {
    let dollarSigns = "";
    for (let i = 0; i < level; i++) {
      dollarSigns += "$";
    }
    return dollarSigns;
  };
  const getRatingsLevel = (level) => {
    const starComponents = Array.from({ length: Math.floor(level) }, (_, index) => (
      <SvgXml key={index} xml={star} width={20} height={20} />
    ));
    return starComponents;
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
          <Title>{restaurant.name}</Title>
          <InfoText>{getPriceLevel(restaurant.price_level)} {restaurant.distance}</InfoText>
          <InfoText>
            {getRatingsLevel(restaurant.rating)} {restaurant.rating}      Reviews:({restaurant.user_ratings_total})
          </InfoText>
          <InfoText>{restaurant.vicinity}</InfoText>
          <InfoText>({restaurant.opening_hours && restaurant.opening_hours.open_now ? 'Open' : 'Closed'})</InfoText>

          <RowContainer>
            <TouchableOpacity onPress={openGoogleMaps}>
              <LinkIcon source={require("../../../assets/gmap.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openPhoneNumber}>
              <LinkIcon source={require("../../../assets/phone.webp")} />
            </TouchableOpacity>
          </RowContainer>
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
