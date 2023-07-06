import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const RatingFilter = ({ onFilterApply }) => {
    const [selectedRating, setSelectedRating] = useState(0);

    const selectRating = (rating) => {
        setSelectedRating(rating);
    };

    const applyFilter = () => {
        // console.log(`Filter applied with rating: ${selectedRating}`);
        onFilterApply(selectedRating);
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                {[1, 2, 3, 4, 5].map((rating, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => selectRating(rating)}>
                        <MaterialIcons
                            name="star-border"
                            size={40}
                            color={rating <= selectedRating ? 'gold' : 'gray'} // Set color here
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        padding: 10,
                        marginLeft: 10,
                    }}
                    onPress={() => setSelectedRating(null)}>
                    <Text style={{ color: 'white' }}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        padding: 10,
                        marginLeft: 10,
                    }}
                    onPress={applyFilter}>
                    <Text style={{ color: 'white' }}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RatingFilter;
