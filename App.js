import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from 'axios';

import { SafeArea } from './src/components/utility/safe-area.component';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapScreen from './src/features/screens/MapScreen';
import { HomeScreen } from './src/features/screens/HomeScreen';
import Logo from './src/features/homepage/Logo';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Home: 'md-restaurant',
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

  //bring in the results
  const filters = {
    radius: 5 * 1609, //dynamically change with distance slider input
    keywords: null, //dynamically change with cuisine filter
    rating: null, //dynamically change with rating filter
    price: null, //dynamically change with price filter
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
            <Tab.Screen name="Home"
              options={{
                headerTitle: () => <Logo />,
                headerTitleAlign: "center",
              }}>
              {() => (
                <HomeScreen restaurantData={restaurantData} />
              )}
            </Tab.Screen>
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
