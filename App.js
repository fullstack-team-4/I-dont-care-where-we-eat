import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Text, Alert } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { SafeArea } from './src/components/utility/safe-area.component';

import MapScreen from './src/features/screens/MapScreen';
import { RestaurantsScreen } from "./src/features/screens/restaurants.screen";
import React, { useState, useEffect } from 'react';

import { PaperProvider } from 'react-native-paper';

import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';
import RandomButton from './src/features/homepage/randomButton';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
};

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);

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
  const [userLocation, setUserLocation] = useState(null);
  const [restaurantData, setRestaurantData] = useState([]);

  const filters = {
    radius: 5 * 1609,
    keywords: null,
    rating: null,
    price: null,
    type: null,
  };

  // GET USERS LOCATION
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
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=${filters.radius}&type=restaurant&key=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          setRestaurantData(response.data.results);
        })
        .catch((error) => {
          Alert.alert('Error fetching restaurant data:', error);
        });
    }
  }, [userLocation]);

  // console.log(userLocation);

  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ size, color }) => {
                const iconName = TAB_ICON[route.name];
                return (
                  <Ionicons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                display: 'flex',
              },
            })}>
            <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
            <Tab.Screen name="Map">
              {() => (
                <MapScreen
                  userLocation={userLocation}
                  restaurantData={restaurantData}
                  filters={filters}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
}
