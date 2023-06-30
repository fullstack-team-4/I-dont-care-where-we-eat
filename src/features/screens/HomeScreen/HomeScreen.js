import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { RestaurantsScreen } from "../restaurants.screen";
import MapScreen from "../mapView.screen";
import { SettingsScreen } from "../Settings/SettingsScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components";
import DistanceSlider from "../../homepage/DistanceSlider";
import RandomButton from "../../homepage/randomButton";
import FilterBar from "../../homepage/FilterBar";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const HomeScreen = () => {
  const [randomRestaurant, setRandomRestaurant] = useState(null);

  const handleRandomButtonPress = () => {
    console.log("WHY WONT YOU WORK");
  };

  useEffect(() => {
    if (randomRestaurant) {
      console.log("Random restaurant:", randomRestaurant);
    }
  }, [randomRestaurant]);
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
  

  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        {/* <FilterBar />
        <DistanceSlider />
        <RandomButton onPress={() => console.log("boop")} /> */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ size, color }) => {
              const iconName = TAB_ICON[route.name];
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              display: "flex",
            },
          })}
        >
          <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
};

export default HomeScreen;
