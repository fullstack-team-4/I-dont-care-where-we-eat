import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components/native";
import styled from "styled-components/native";

import { SafeArea } from "./src/components/utility/safe-area.component";

import { Navigation } from "./src/features/navigation/Navigation";
import { useFonts as useOswald, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);
const Tab = createBottomTabNavigator();

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
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    // Return a loading state or fallback UI if the fonts are not loaded yet
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      
          <Navigation />
        
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
