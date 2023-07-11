import React from 'react';
import { StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import RandomButton from '../homepage/randomButton';
import FilterBar from '../homepage/FilterBar';
import DistanceFilter from '../homepage/filters/DistanceFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const HomeScreen = ({ filters, states }) => {
    return (
        <SafeArea>
            <ScrollView>
                <FilterBar filters={filters}
                  isCuisineFilterApplied={cuisineFilters.length > 0}
                  isPriceFilterApplied={priceFilters !== null}
                  isRatingFilterApplied={ratingFilter !== null} />
                <DistanceFilter defaultValue={states} filters={filters} />
                <RandomButton states={states} />
            </ScrollView>
        </SafeArea>
    );
};
