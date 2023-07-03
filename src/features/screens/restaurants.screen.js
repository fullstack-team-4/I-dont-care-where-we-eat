import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { StatusBar, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { View } from 'react-native';
// import { Spacer } from '../../components/spacers/spacer.component';
import { Text } from 'react-native';
import RandomButton from '../homepage/randomButton';
import FilterBar from '../homepage/FilterBar';
import DistanceSlider from '../homepage/DistanceSlider';

import { GOOGLE_MAPS_API_KEY } from '@env';

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

export const RestaurantsScreen = () => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);
  
    const handleRandomButtonPress = () => {
      console.log("WHY WONT YOU WORK");
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
                <RandomButton onPress={handleRandomButtonPress()} />
                </ScrollView>
      </SafeArea>
    );
};
