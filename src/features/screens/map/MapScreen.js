// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Dimensions, Button } from 'react-native';

// import * as Location from 'expo-location';
// import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// export const MapScreen = () => {
//     const [mapRegion, setMapRegion] = useState(null);

//     const userLocation = async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Permission to access location was denied');
//             return;
//         }
//         let location = await Location.getCurrentPositionAsync({
//             enableHighAccuracy: true,
//         });
//         setMapRegion({
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//         });
//     };

//     useEffect(() => {
//         userLocation();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 region={mapRegion}
//                 provider={PROVIDER_GOOGLE}>
//                 <Circle
//                     center={mapRegion}
//                     radius={4828}
//                     strokeWidth={3}
//                     strokeColor="#2778e4"
//                 />
//                 <Marker coordinate={mapRegion} title="Marker" />
//                 {/* <Button title="Get Location" onPress={userLocation} /> */}
//             </MapView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         width: '100%',
//         height: '100%',
//     },
// });