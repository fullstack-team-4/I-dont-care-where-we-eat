import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../MapScreen';
import { SettingsScreen } from '../Settings/SettingsScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'styled-components';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { HomeScreen } from '../HomeScreen';
import Logo from '../../homepage/Logo';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: 'md-restaurant',
    Map: 'md-map',
    Settings: 'md-settings',
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

const Homeicons = ({ filters, states }) => {
    return (
        <PaperProvider>
            <ThemeProvider theme={theme}>
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
                    <Tab.Screen
                        name="Restaurants"
                        options={{
                            headerTitle: () => <Logo />,
                            headerTitleAlign: 'center',
                        }}>
                        {() => (
                            <HomeScreen
                                filters={filters}
                                states={states}
                            />
                        )}
                    </Tab.Screen>

                    <Tab.Screen name="Map">
                        {() => (
                            <MapScreen
                                filters={filters}
                                states={states}
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </PaperProvider>
    );
};

export default Homeicons;
