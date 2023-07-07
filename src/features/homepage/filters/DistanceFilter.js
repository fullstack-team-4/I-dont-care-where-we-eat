import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const meterConversion = 1609.34; //meters in a mile

const DistanceFilter = ({ onFilterApply }) => {
    const [distance, setDistance] = useState(5);

    const handleDistanceFilter = (value) => {
        setDistance(value);
    };

    const applyDistanceFilter = () => {
        const freedomUnits = distance * meterConversion;
        onFilterApply(Math.floor(freedomUnits));
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
            }}>
            <Text style={{ textAlign: 'center' }}>{distance} miles</Text>
            <Slider
                minimumValue={1}
                maximumValue={20}
                step={1}
                value={distance}
                onSlidingComplete={applyDistanceFilter}
                onValueChange={handleDistanceFilter}
            />
        </View>
    );
};

export default DistanceFilter;
