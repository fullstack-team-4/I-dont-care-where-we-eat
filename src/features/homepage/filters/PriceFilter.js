import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PriceFilter = ({ onFilterApply }) => {
    const prices = {
        $: 0,
        $$: 1,
        $$$: 2,
        $$$$: 3,
    };
    const [selectedPrice, setSelectedPrice] = useState(null);

    const selectPrice = (selected) => {
        setSelectedPrice(selected);
    };

    const applyFilter = () => {
        // console.log(`Filter applied with price: ${prices[selectedPrice]}`);
        onFilterApply(prices[selectedPrice]);
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {Object.entries(prices).map(([price, index]) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        backgroundColor:
                            price === selectedPrice ? 'blue' : 'gray',
                        marginBottom: 10,
                        borderRadius: 10,
                        padding: 10,
                        alignItems: 'center',
                    }}
                    onPress={() => selectPrice(price)}>
                    <Text style={{ color: 'white' }}>{price}</Text>
                </TouchableOpacity>
            ))}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        marginBottom: 10,
                        borderRadius: 10,
                        padding: 10,
                        marginRight: 10, // Add some margin to separate the buttons
                        alignItems: 'center',
                    }}
                    onPress={() => setSelectedPrice(null)}>
                    <Text style={{ color: 'white' }}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        marginBottom: 10,
                        borderRadius: 10,
                        padding: 10,
                        alignItems: 'center',
                    }}
                    onPress={applyFilter}>
                    <Text style={{ color: 'white' }}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PriceFilter;
