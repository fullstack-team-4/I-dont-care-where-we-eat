import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "../MapScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { HomeScreen } from "../HomeScreen";

import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from "@env";
import axios from "axios";

import Logo from "../../homepage/Logo";
import { SignInScreen } from "../SignInScreen/SignInScreen";
import { SettingsScreen } from "../Settings/SettingsScreen";
import { Auth,Hub } from "aws-amplify";


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
  Profile:"person-circle-outline"
};

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

const HomeScreenGuest = ({ filters, states }) => {
  const [user, setUser] = useState(undefined);
  const checkUser = async () => {

    try{
      const authUser = await Auth.currentAuthenticatedUser({ bypassCach: true });
      setUser(authUser)
    }
    catch(e){
      setUser(null)

    }

  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);


  
  

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
                            headerTitleAlign: 'center',
                        }}>
                        {() => <HomeScreen filters={filters} states={states} />}
                    </Tab.Screen>

                    <Tab.Screen name="Map">
                        {() => <MapScreen filters={filters} states={states} />}
                    </Tab.Screen>
          <Tab.Screen name="Profile" component={user ? SettingsScreen : SignInScreen}/>
        </Tab.Navigator>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </PaperProvider>
  );
                      }

export default HomeScreenGuest;
