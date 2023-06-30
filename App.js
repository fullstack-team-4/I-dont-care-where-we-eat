import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { ThemeProvider } from "styled-components/native";

import { SafeArea } from "./src/components/utility/safe-area.component";

import DistanceSlider from "./src/features/homepage/DistanceSlider";
import MapScreen from "./src/features/screens/mapView.screen";
import { RestaurantsScreen } from "./src/features/screens/restaurants.screen";

import RandomButton from './src/features/homepage/randomButton';
import React, { useState, useEffect } from 'react';

import { PaperProvider } from "react-native-paper";
import FilterBar from "./src/features/homepage/FilterBar";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text> Map</Text>
  </SafeArea>
);

const theme = {
  colors: {
    primary: "#FF0000",
    secondary: "#00FF00",
    background: "#FFFFFF",
    text: "#000000",
  },
  fonts: {
    regular: "Arial",
    bold: "Helvetica-Bold",
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export default function App() {
    const [randomRestaurant, setRandomRestaurant] = useState(null);

    const handleRandomButtonPress = () => {
        console.log('WHY WONT YOU WORK');
    };

    useEffect(() => {
        if (randomRestaurant) {
            console.log('Random restaurant:', randomRestaurant);
        }
    }, [randomRestaurant]);
    return (
        <>
      <PaperProvider>
        <FilterBar />
      </PaperProvider>
            <ThemeProvider theme={theme}>
                <DistanceSlider  />
                <RandomButton onPress={() => console.log('boop')} />
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
                        {/* <Tab.Screen
                            name="Restaurants"
                            component={RestaurantsScreen}
                        /> */}
                        <Tab.Screen name="Map" component={MapScreen} />
                        <Tab.Screen name="Settings" component={Settings} />
                    </Tab.Navigator>
                </NavigationContainer>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </>
    );
}
