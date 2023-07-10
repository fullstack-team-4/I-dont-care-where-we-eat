import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'react-native';
import RandomButton from '../homepage/randomButton';
import FilterBar from '../homepage/FilterBar';
import DistanceFilter from '../homepage/filters/DistanceFilter';

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

export const HomeScreen = ({
    userLocation,
    restaurantData,
    filters,
    states,
}) => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    return (
        <SafeArea>
            <ScrollView>
                <FilterBar filters={filters} />
                <DistanceFilter defaultValue={states} filters={filters} />
                <RandomButton restaurants={restaurantData} />
            </ScrollView>
        </SafeArea>
    );
};
