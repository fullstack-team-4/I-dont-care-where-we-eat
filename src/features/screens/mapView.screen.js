import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Button, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const radius = 5 * 1609;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    useEffect(() => {
        if (location) {
            const apiKey = GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

            axios
                .get(url)
                .then((response) => {
                    setRestaurants(response.data.results);
                })
                .catch((error) => {
                    setErrorMsg('Error fetching restaurant data:', error);
                });
        }
    }, [location]);

    const handlePress = async () => {
        setLoading(true);
        try {
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            const { latitude, longitude } = location.coords;
            setLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            // Instead of setting the restaurants to the location, fetch the restaurants
            // based on the updated location.
            const apiKey = GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

            axios
                .get(url)
                .then((response) => {
                    setRestaurants(response.data.results);
                })
                .catch((error) => {
                    setErrorMsg('Error fetching restaurant data:', error);
                });
        } catch (error) {
            setErrorMsg('Error getting location:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!location || loading) {
        return (
            <ActivityIndicator style={styles.loadingContainer} size="large" />
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            ) : null}
            {location ? (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={location}>
                    <Circle
                        center={location}
                        radius={radius}
                        strokeColor="#0084ff"
                        fillColor="rgba(102,204,255,0.3)"
                        strokeWidth={2}
                    />
                    <Marker
                        title="me"
                        coordinate={location}
                        pinColor="#0066ff"
                    />

                    {restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.place_id}
                            coordinate={{
                                latitude: restaurant.geometry.location.lat,
                                longitude: restaurant.geometry.location.lng,
                            }}
                            title={restaurant.name}
                            description={restaurant.vicinity}
                        />
                    ))}
                </MapView>
            ) : null}

            <View style={styles.buttonContainer}>
                <Button title="Get Current Location" onPress={handlePress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        position: 'absolute',
        top: '10%',
        alignSelf: 'center',
        // backgroundColor: '#e1e1ea',
        backgroundColor: '#99ccff',
        borderRadius: 10, // Adjust the value to control the roundness of the corners
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)', // Lightly colored shadow
        shadowOpacity: 0.5, // Adjust the opacity for desired effect
        shadowRadius: 3, // Adjust the radius for desired effect
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3, // For Android shadow effect
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
