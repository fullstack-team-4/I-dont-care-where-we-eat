import React, { useEffect, useState } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
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

  const linkedInProfiles = [
    {
      name: 'Byron Marcatoma',
      url: 'https://www.linkedin.com/in/byronmarcatoma',
    },
    {
      name: 'Angel Gonzalez',
      url: 'https://www.linkedin.com/in/angel-gonzalez-ux-ui',
    },
    {
      name: 'Florencio Rendon',
      url: 'https://www.linkedin.com/in/florencio-rendon',
    },
    {
      name: 'Frank Latino',
      url: 'https://www.linkedin.com/in/franklatino18',
    },
    {
      name: 'Skyler Morton',
      url: 'https://www.linkedin.com/in/skyleramorton',
    },
  ];

  const openLinkedInProfile = (url) => {
    Linking.openURL(url);
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
      <Text style={{ fontSize: 24 }}>Home, Sweet Home</Text>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {linkedInProfiles.map((profile, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openLinkedInProfile(profile.url)}
          >
            <Text style={{ marginVertical: 5 }}>{profile.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
