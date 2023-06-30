import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SettingsScreen } from "../Settings/SettingsScreen";
import { RestaurantsScreen } from "../restaurants.screen";
const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};



const Map = () => (
  <SafeArea>
    <Text>Map</Text>
  </SafeArea>
);

const HomeScreen = () => (
  <NavigationContainer independent={true}>
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
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default HomeScreen;
