import React, { useEffect, useState } from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

const backgroundImage = require('../../../../assets/home-backg.avif');

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
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome, {username}
        </Text>
        <Text style={styles.heading}>
          App Developers
        </Text>

        <View style={styles.profilesContainer}>
          {linkedInProfiles.map((profile, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLinkedInProfile(profile.url)}
              style={styles.profileButton}
            >
              <Text style={styles.profileButtonText}>{profile.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 70,
    textShadowColor: 'gold',
    textShadowOffset: { width: 2, height: 2 },
    textDecorationLine: 'underline',
    textShadowRadius: 6,
    textDecorationStyle: 'solid',
    color: 'white',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textDecorationLine: 'underline',
    marginVertical: 20,
    textShadowColor: 'gold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    textDecorationLine: 'underline',
    color: 'white',
  },
  profilesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  profileButtonText: {
    color: 'white',
  },
  signOutButton: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    marginVertical: 100,
    fontSize: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textDecorationLine: 'underline',
  },
  signOutButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
