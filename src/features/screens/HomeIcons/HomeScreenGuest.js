import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "../MapScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components";
import { View, Text, Button } from "react-native"; 

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { HomeScreen } from "../HomeScreen";

import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from "@env";
import axios from "axios";

import Logo from "../../homepage/Logo";


import { useNavigation } from "@react-navigation/native";

const SettingsGuest = () => {
  const navigation = useNavigation();
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View >
      <Text >You are a guest</Text>
      <Button onPress={onSignUpPressed} title="Sign Up" />

      
    </View>
  );
};

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};


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

const HomeScreenGuest = () => {
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
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
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
          Alert.alert("Error fetching restaurant data:", error);
        });
    }
  }, [userLocation]);

  // console.log(userLocation);

  
  

  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        
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
          <Tab.Screen
              name="Restaurants"
              options={{
                headerTitle: () => <Logo />,
                headerTitleAlign: "center",
              }}
            >
              {() => <HomeScreen restaurantData={restaurantData} />}
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
          <Tab.Screen name="Settings" component={SettingsGuest} />
        </Tab.Navigator>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
};

export default HomeScreenGuest;
