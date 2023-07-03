import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Button,
    View,
    StatusBar,
    FlatList,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';
import styled from 'styled-components/native';
import { Spacer } from '../../components/spacers/spacer.component';
import SearchInput from '../../features/searchBar/SeachInput';




export default function MapScreen() {
    //state for user location
    const [location, setLocation] = useState(null);
    //state for restuarants data
    const [restaurants, setRestaurants] = useState([]);
    //state for loading
    const [loading, setLoading] = useState(false);
    //state for list view
    const [listView, setListView] = useState(false);
    //state for search query
    const [searchResults, setSearchResults] = useState([]);
    //need a state for after the search is completed


    const radius = 5 * 1609;
    const prevRestaurantsRef = useRef([]);
    //GET USERS LOCATION
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
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

    //MAKE GET REQUEST TO GOOGLE PLACES API WITH USERS LOCATION
    useEffect(() => {
        if (location) {
            const apiKey = GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

            axios
                .get(url)
                .then((response) => {
                    setRestaurants(response.data.results);
                    prevRestaurantsRef.current = response.data.results;
                })
                
                .catch((error) => {
                    Alert.alert('Error fetching restaurant data:', error);
                });
        }
    }, [location]);
    

    //UPDATE USER LOCATION SO IT DOESN'T AUTOMATICALLY DRAIN BATTERY LIFE
    const handlePress = async () => {
        setLoading(true);
        try {
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            setLoading(false);
            const { latitude, longitude } = location.coords;
            setLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            const apiKey = GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

            axios
                .get(url)
                .then((response) => {
                    setRestaurants(response.data.results);

                    prevRestaurantsRef.current = response.data.results;
                })
                .catch((error) => {
                    Alert.alert('Error fetching restaurant data:', error);
                });
        } catch (error) {
            Alert.alert('Error getting location:', error);
        } finally {
            setLoading(false);
        }
    };

    //Callback function to take in the input from the SearchInput component
    const handleSearch = (query) => {
        const filteredRestaurants = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(query.toLowerCase())
        );
        setRestaurants(filteredRestaurants);
        // setSearchResults(query);
    };

    const resetSearch = () => {
        setSearchResults([]);
        setRestaurants(prevRestaurantsRef.current);
    };

    //CHANGE STATE FROM MAP VIEW TO LIST VIEW
    const handleListView = () => {
        setListView((prevListView) => !prevListView);
    };

    if (!location || loading) {
        return (
            <ActivityIndicator style={styles.loadingContainer} size="large" />
        );
    }
    if (listView) {
        const SafeArea = styled(SafeAreaView)`
            flex: 1;
            ${StatusBar.currentHeight &&
            `margin-top: ${StatusBar.currentHeight}px`};
        `;

        const SearchContainer = styled(View)`
            padding: 13px;
        `;

        const RestaurantList = styled(FlatList).attrs({
            contentContainerStyle: {
                padding: 16,
            },
        })``;
        const RestaurantItem = styled(Text)`
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
        `;
        //LIST VIEW STATE
        return (
            <SafeArea>

                <SearchContainer>
                    {/* pass the function as props */}
                    <SearchInput
                        onSearch={handleSearch}
                        SetSearchResults={setSearchResults}
                    />
                </SearchContainer>
                <RestaurantList
                
                    data={restaurants}
                    renderItem={({ item }) => (
                        <Spacer position="bottom" size="large">
                            <RestaurantItem key={item.place_id}>
                                {item.name}
                            </RestaurantItem>
                        </Spacer>
                    )}
                    keyExtractor={(item) => item.place_id}
                />
                <View style={styles.listViewButton}>
                    <Button title="Map View" onPress={handleListView} />
                </View>
                <View style={styles.resetSearchButton}>
                    <Button title="Clear Search" onPress={resetSearch} />
                </View>
            </SafeArea>
        );
    }
    //MAP VIEW STATE
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

            <View style={styles.updateLocationButton}>
                <Button title="Get Current Location" onPress={handlePress} />
            </View>
            <View style={styles.listViewButton}>
                <Button title="List View" onPress={handleListView} />
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
    updateLocationButton: {
        position: 'absolute',
        top: '5%',
        alignSelf: 'center',
        backgroundColor: '#99ccff',
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
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
    listViewButton: {
        position: 'absolute',
        bottom: '2%',
        right: '5%',
        alignSelf: 'center',
        backgroundColor: '#99ccff',
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },
    resetSearchButton: {
        position: 'absolute',
        bottom: '2%',
        left: '5%',
        alignSelf: 'center',
        backgroundColor: '#99ccff',
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },
});

