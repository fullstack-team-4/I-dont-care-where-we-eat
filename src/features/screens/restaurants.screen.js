import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StatusBar, FlatList, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Spacer } from '../../components/spacers/spacer.component';
import { Text } from 'react-native';
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

export const RestaurantsScreen = () => (
    <SafeArea>
        <SearchContainer>
            <Searchbar />
        </SearchContainer>
        <RestaurantList
            data={[
                { name: '1' },
                { name: '2' },
                { name: '3' },
                { name: '4' },
                { name: '5' },
                { name: '6' },
                { name: '7' },
                { name: '8' },
                { name: '9' },
                { name: '10' },
                { name: '11' },
                { name: '12' },
                { name: '13' },
                { name: '14' },
            ]}
            renderItem={({ item }) => (
                <Spacer position="bottom" size="large">
                    <RestaurantItem>{item.name}</RestaurantItem>
                </Spacer>
            )}
            keyExtractor={(item) => item.name}
        />
    </SafeArea>
);
