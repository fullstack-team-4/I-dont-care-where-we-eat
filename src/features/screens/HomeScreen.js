import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'react-native';
import RandomButton from '../homepage/randomButton';
import FilterBar from '../homepage/FilterBar';
import DistanceFilter from '../homepage/filters/DistanceFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const HomeScreen = ({ restaurantData }) => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [cuisineFilters, setCuisineFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState(null);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [distanceFilter, setDistanceFilter] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

console.log('This is PriceFilter--->', priceFilters)
// console.log('This is RatingFilter--->', ratingFilter)

    const handleFilterChange = (filterName) => {
        setActiveFilter(filterName);
    };

    const handleDistanceFilter = (selectedDistance) => {
        setDistanceFilter(selectedDistance);
        // console.log('selectedDistance, HomeScreen.js', selectedDistance);
    };

    const handleOpenFilter = (isEnabled) => {
        setIsOpen(!isEnabled);
        // console.log('isOpen, HomeScreen.js', isOpen);
    };

    const handleCuisineFilter = (selectedCuisines) => {
        setCuisineFilters(selectedCuisines);
        // console.log('selectedCuisines, HomeScreen.js', selectedCuisines);
    };

    const handlePriceFilter = (selectedPrices) => {
        setPriceFilters(selectedPrices);
        // console.log('selectedPrices, HomeScreen.js', selectedPrices);
    };

    const handleRatingFilter = (selectedRating) => {
        setRatingFilter(selectedRating);
        // console.log('selectedRating, HomeScreen.js', selectedRating);
    };

    const filters = {
        handleDistanceFilter,
        handleOpenFilter,
        handleCuisineFilter,
        handlePriceFilter,
        handleRatingFilter,
    };
      

    useEffect(() => {
        if (randomRestaurant) {
            console.log('Random restaurant:', randomRestaurant);
        }
    }, [randomRestaurant]);
    // console.log(restaurantData);

    return (
        <SafeArea>
            <ScrollView>
                <FilterBar
                    filters={filters}
                    activeFilter={activeFilter}
                    handleFilterChange={handleFilterChange}
                    handleOpenFilter={handleOpenFilter}
                    isCuisineFilterApplied={cuisineFilters.length > 0}
                    isPriceFilterApplied={priceFilters !== null}
                    isRatingFilterApplied={ratingFilter !== null}
                />
                <DistanceFilter
                    defaultValue={distanceFilter}
                    onFilterApply={handleDistanceFilter}
                />
                <RandomButton restaurants={restaurantData}
                 />
            </ScrollView>
        </SafeArea>
    );
};
