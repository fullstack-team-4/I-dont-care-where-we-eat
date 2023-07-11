import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Text, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components/native';
import { Navigation } from './src/features/navigation/Navigation';
import {
    useFonts as useOswald,
    Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';
//CAN THESE BE DELETED??
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import styled from 'styled-components/native';
// import { SafeArea } from './src/components/utility/safe-area.component';
Amplify.configure(awsconfig);
const Tab = createBottomTabNavigator();

const theme = {
    colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
        background: '#FFFFFF',
        text: '#000000',
    },
    fonts: {
        regular: 'Arial',
        bold: 'Helvetica-Bold',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};

export default function App() {
    const [oswaldLoaded] = useOswald({ Oswald_400Regular });
    const [latoLoaded] = useLato({ Lato_400Regular });
    const [userLocation, setUserLocation] = useState(null);
    const [restaurantData, setRestaurantData] = useState([]);
    const [cuisineFilters, setCuisineFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState(null);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [distanceFilter, setDistanceFilter] = useState(5 * 1609.344); //miles to meter conversion
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    const handleFilterChange = (filterName) => {
        setActiveFilter(filterName);
    };

    const handleDistanceFilter = (selectedDistance) => {
        setDistanceFilter(selectedDistance);
        // console.log('selectedDistance, App.js', selectedDistance, typeof selectedDistance);
    };

    const handleOpenFilter = (isEnabled) => {
        setIsOpen(!isEnabled);
        // console.log('isOpen, App.js', isOpen, typeof isOpen);
    };

    const handleCuisineFilter = (selectedCuisines) => {
        setCuisineFilters(selectedCuisines);
        // console.log('selectedCuisines, App.js',selectedCuisines, typeof selectedCuisines);
    };

    const handlePriceFilter = (selectedPrices) => {
        setPriceFilters(selectedPrices);
        // console.log('selectedPrices, App.js', selectedPrices, typeof selectedPrices);
    };

    const handleRatingFilter = (selectedRating) => {
        setRatingFilter(selectedRating);
        // console.log('selectedRating, App.js', selectedRating, typeof selectedRating);
    };

    const filters = {
        handleFilterChange,
        handleDistanceFilter,
        handleOpenFilter,
        handleCuisineFilter,
        handlePriceFilter,
        handleRatingFilter,
    };

    const states = {
        cuisineFilters,
        priceFilters,
        ratingFilter,
        distanceFilter,
        isOpen,
        activeFilter,
        userLocation,
        restaurantData,
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setUserLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    //MAKE API CALL TO GOOGLE PLACES
    useEffect(() => {
        if (userLocation) {
            const apiKey = GOOGLE_MAPS_API_KEY;

            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${cuisineFilters}&location=${userLocation.latitude},${userLocation.longitude}&maxprice=${priceFilters}&opennow=${isOpen}&radius=${distanceFilter}&type=restaurant&key=${apiKey}`;

            axios
                .get(url)
                .then((response) => {
                    setRestaurantData(response.data.results);
                })
                .catch((error) => {
                    Alert.alert('Error fetching restaurant data:', error);
                });
        }
    }, [userLocation, cuisineFilters, priceFilters, isOpen, distanceFilter]);

    if (!oswaldLoaded || !latoLoaded) {
        // Return a loading state or fallback UI if the fonts are not loaded yet
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Navigation filters={filters} states={states} />
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </>
    );
}
