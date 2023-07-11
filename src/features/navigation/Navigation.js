import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/SignInScreen/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen/SignUpScreen';
import { ConfirmEmailScreen } from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import { NewPasswordScreen } from '../screens/NewPasswordScreen/NewPasswordScreen';
import Homeicons from '../screens/HomeIcons/HomeIcons';
import { Auth, Hub } from 'aws-amplify';
import HomeScreenGuest from '../screens/HomeIcons/HomeScreenGuest';

const Stack = createNativeStackNavigator();

export const Navigation = ({filters,states}) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
          <>
          
          <Stack.Screen name="GuestHome">
                            {() => (
                                <HomeScreenGuest
                                    filters={filters}
                                    states={states}
                                />
                            )}
                        </Stack.Screen>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            
          </>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
