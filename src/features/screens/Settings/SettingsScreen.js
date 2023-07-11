import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const SettingsScreen = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: 'center' }}>
        Welcome, {username}
      </Text>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}
      >
        Sign Out
      </Text>
    </View>
  );
};
