import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const meterConversion = 1609.34; //meters in a mile

const DistanceFilter = ({ filters }) => {
    const [distance, setDistance] = useState(5);

    const handleDistanceFilter = (value) => {
        setDistance(value);
    };

    const applyDistanceFilter = () => {
        const freedomUnits = distance * meterConversion;
        filters.handleDistanceFilter(Math.floor(freedomUnits));
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
            }}>
            <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 30,
                color: 'red',
                flexDirection: 'row',
                backgroundColor: 'white',
                borderWidth: 1,
                borderRadius: 15,
                paddingHorizontal: 15,
                alignSelf: 'center'


            }}>{distance} miles</Text>
            <Slider
                minimumValue={1}
                maximumValue={20}
                step={1}
                value={distance}
                onSlidingComplete={applyDistanceFilter}
                onValueChange={handleDistanceFilter}
                thumbTintColor="red" 
                maximumTrackTintColor='grey'
            />

        </View>
    );
};

export default DistanceFilter;
