import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'react-native';
import RandomButton from '../homepage/randomButton';
import FilterBar from '../homepage/FilterBar';
import DistanceSlider from '../homepage/DistanceSlider';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled(View)`
    padding: 13px;
`;

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;
const RestaurantItem = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
`;

export const RestaurantsScreen = ({restaurantData}) => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
  
    const handleRandomButtonPress = () => {
      if (restaurants.length > 0) {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const randomRestaurant = restaurants[randomIndex];
        setRandomRestaurant(randomRestaurant);
      }
    };
  
    useEffect(() => {
      if (randomRestaurant) {
        console.log("Random restaurant:", randomRestaurant);
      }
    }, [randomRestaurant]);
  
    return (
        <SafeArea>
          <ScrollView>
            <FilterBar />
            <DistanceSlider />
            <RandomButton restaurants={restaurantData} />
          </ScrollView>
        </SafeArea>
      );
    };