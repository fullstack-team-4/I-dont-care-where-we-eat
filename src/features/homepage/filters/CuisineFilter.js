import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const cuisine = [
    'Italian',
    'Chinese',
    'Mexican',
    'Indian',
    'French',
    'Thai',
    'BBQ',
    'Dessert',
    'Pizza',
    'Seafood',
    'Sushi',
    'Steak',
];

const CuisineFilter = ({ onFilterApply }) => {
    const [selectedCuisines, setSelectedCuisines] = useState('');

    const selectCuisine = (selected) => {
        if (selectedCuisines.includes(selected)) {
            setSelectedCuisines(selectedCuisines.filter((c) => c !== selected));
        } else {
            setSelectedCuisines([...selectedCuisines, selected]);
        }
    };

    const renderCuisine = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.cuisineItem,
                selectedCuisines.includes(item) && styles.selected,
            ]}
            onPress={() => selectCuisine(item)}>
            <Text style={styles.cuisineText}>{item}</Text>
        </TouchableOpacity>
    );

    const applyFilter = () => {
        onFilterApply(selectedCuisines.join('%20').toLowerCase());
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cuisine}
                renderItem={renderCuisine}
                keyExtractor={(item) => item}
                numColumns={3}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setSelectedCuisines([])}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={applyFilter}>
                    <Text style={styles.buttonText}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cuisineItem: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'gray', //changed background to grey
        alignItems: 'center',
    },
    selected: {
        backgroundColor: 'blue',
    },
    cuisineText: {
        fontSize: 16,
        color: 'white', //added white text
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    buttonText: {
        color: 'white',
    },
});

export default CuisineFilter;
