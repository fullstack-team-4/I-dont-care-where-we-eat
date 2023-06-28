import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components/native";
import styled from "styled-components/native";

import { SafeArea } from "./src/components/utility/safe-area.component";

import { RestaurantsScreen } from "./src/features/screens/restaurants.screen";
import { SignInScreen } from "./src/features/screens/SignInScreen/SignInScreen";
import { MapScreen } from "./src/features/screens/map/MapScreen";
import { SignUpScreen } from "./src/features/screens/SignUpScreen/SignUpScreen";
import { ConfirmEmailScreen } from "./src/features/screens/ConfirmEmailScreen/ConfirmEmailScreen";
import { ForgotPasswordScreen } from "./src/features/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import { NewPasswordScreen } from "./src/features/screens/NewPasswordScreen/NewPasswordScreen";
import { Navigation } from "./src/features/navigation/Navigation";

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
  return (
    <>
      <ThemeProvider theme={theme}>

      <Navigation/>

        {/* <NavigationContainer>
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
            <Tab.Screen name="Restaurants" component={SignInScreen} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Settings" component={ConfirmEmailScreen} />
          </Tab.Navigator>
        </NavigationContainer> */}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
