import React from "react";
import styled from "styled-components/native";
import { Text, Image, View, TouchableOpacity, Linking } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import star from "../../../assets/star";
import open from "../../../assets/open";
import { isNotEmittedStatement } from "typescript";
import { GOOGLE_MAPS_API_KEY } from '@env'


const RestaurantCard = styled(Card)`
    background-color: white;
    margin-bottom: 16px;
    min-width: 100%;
    margin-horizontal: 20px;
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: 16px;
  background-color: white;
`;

const Address = styled(Text)`
  font-family: "Oswald_400Regular";
  font-size: 30px;
`;


const Title = styled(Text)`
  font-family: "Lato_400Regular";
  font-size: 30px;
  color: black;
  font-weight: bold;
`;

const Info = styled.View`
  padding: 16px;
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const PlaceholderImage = () => (
  <Image
    source={require('../../../assets/IDC_Logo.png')}
    style={{ width: 300, height: 300 }}
  />
);

const LinkIcon = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

export const RestaurantInfoCard = ({ name, rating, isClosedTemporarily, opening_hours, vicinity, photos, user_ratings_total }) => {
  if (!photos ) return

  const reference = photos[0]?.photo_reference;
  const apiKey = GOOGLE_MAPS_API_KEY;
  let photoUrl = null;

  if (reference && apiKey) {
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&maxheight=300&maxwidth=400&key=${apiKey}`;
  } else {
    console.log('Invalid reference or apiKey');
  }

  const starComponents = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <SvgXml key={index} xml={star} width={20} height={20} />
  ));

  const { open_now } = opening_hours || {};

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/place/?q=place_id:${vicinity}`;
    Linking.openURL(url);
  };

  return (
    <RestaurantCard elevation={5}>
      {photoUrl ? (
        <RestaurantCardCover source={{ uri: photoUrl }} />
      ) : (
        <PlaceholderImage />
      )}

      <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>{starComponents}</Rating>
          <Text>
            {rating} ({user_ratings_total})
          </Text>
          <SectionEnd>
            {open_now ?  (
              <SvgXml xml={open} width={30} height={25} />
            ) :  <Text variant="label" style={{ color: 'red', }}>
            CLOSED
          </Text> }
          </SectionEnd>
        </Section>
        <Address>
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{vicinity}</Text>
            {/* {!open_now && (
              <Text variant="label" style={{ color: 'red', }}>
                CLOSED
              </Text>
            )} */}
          </View>
          {/* <TouchableOpacity onPress={openPhoneNumber}>
            <LinkIcon source={require("../../../assets/phone.webp")} />
          </TouchableOpacity> */}
        </Address>
        <TouchableOpacity onPress={openGoogleMaps}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinkIcon source={require('../../../assets/gmap-bg.png')} />
            <Text>Tap here for directions!</Text>
          </View>
        </TouchableOpacity>
      </Info>
    </RestaurantCard>
  );
};
