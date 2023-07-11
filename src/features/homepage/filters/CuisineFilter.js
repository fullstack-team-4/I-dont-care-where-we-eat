import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cuisine = [
    'Italian',
    'Chinese',
    'Mexican',
    'Indian',
    'French',
    'Burger',
    'BBQ',
    'Dessert',
    'Pizza',
    'Seafood',
    'Sushi',
    'Steak',
];

const cuisineIcons = {
    Italian: { library: 'MaterialCommunityIcons', name: 'pasta' },
    Chinese: { library: 'FontAwesome', name: 'cutlery' },
    Mexican: { library: 'MaterialCommunityIcons', name: 'taco' },
    Indian: { library: 'FontAwesome', name: 'cutlery' },
    French: { library: 'MatrialCommunityIcons', name: 'french-fries' },
    Burger: { library: 'MaterialCommunityIcons', name: 'hamburger' },
    BBQ: { library: 'MaterialCommunityIcons', name: 'fire' },
    Dessert: { library: 'MaterialCommunityIcons', name: 'cake-variant' },
    Pizza: { library: 'MaterialCommunityIcons', name: 'pizza' },
    Seafood: { library: 'MaterialCommunityIcons', name: 'fish' },
    Sushi: { library: 'MaterialCommunityIcons', name: 'fish' },
    Steak: { library: 'MaterialCommunityIcons', name: 'cow' },
};

const CuisineFilter = ({ onFilterApply }) => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);

    useEffect(() => {
        loadSelectedCuisines();
    }, []);

    const loadSelectedCuisines = async () => {
        try {
            const cuisines = await AsyncStorage.getItem('selectedCuisines');
            if (cuisines !== null) {
                setSelectedCuisines(JSON.parse(cuisines));
            }
        } catch (error) {
            console.log('Error loading selected cuisines:', error);
        }
    };

    const saveSelectedCuisines = async (cuisines) => {
        try {
            await AsyncStorage.setItem(
                'selectedCuisines',
                JSON.stringify(cuisines)
            );
        } catch (error) {
            console.log('Error saving selected cuisines:', error);
        }
    };

    const selectCuisine = (selected) => {
        if (selected.length === 0) return;
        if (selectedCuisines.includes(selected)) {
            setSelectedCuisines(selectedCuisines.filter((c) => c !== selected));
        } else {
            setSelectedCuisines([...selectedCuisines, selected]);
        }
    };

    useEffect(() => {
        saveSelectedCuisines(selectedCuisines);
    }, [selectedCuisines]);

    const renderCuisine = ({ item }) => {
        const IconComponent =
            cuisineIcons[item].library === 'FontAwesome'
                ? FontAwesome
                : MaterialCommunityIcons;

        return (
            <View
                style={[
                    styles.cuisineItemWrapper,
                    selectedCuisines.includes(item)
                        ? styles.selected
                        : styles.unselected,
                ]}>
                <TouchableOpacity
                    style={styles.cuisineButton}
                    onPress={() => selectCuisine(item)}>
                    <Text style={styles.cuisineText}>{item}</Text>
                    <IconComponent
                        name={cuisineIcons[item].name}
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const applyFilter = () => {
        onFilterApply(selectedCuisines.join('%20').toLowerCase());
        // console.log(`Filter applied with cuisine: ${selectedCuisines}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cuisines</Text>
            <FlatList
                data={cuisine}
                renderItem={renderCuisine}
                keyExtractor={(item) => item}
                numColumns={3}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => setSelectedCuisines([])}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.applyButton}
                    onPress={applyFilter}>
                    <Text style={styles.buttonText}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // ...rest of the styles

    header: {
        fontSize: 20,
        marginBottom: 15,
        color: 'maroon',
        marginRight: 'auto',
    },
    cuisineItemWrapper: {
        margin: 5, // adjust this margin as per your needs
        borderRadius: 10,
    },
    cuisineButton: {
        width: 78, // adjust as needed
        height: 65, // adjust as needed
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#696969',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 1,
    },
    selected: {
        backgroundColor: 'rgba(128, 0, 0, 0.8)',
        // borderColor: "#ff0000", // red border color
        // borderWidth: 1,
    },
    unselected: {
        backgroundColor: '#696969', // original color
        borderColor: '#696969', // border color is same as background color
    },
    cuisineText: {
        fontSize: 14,
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20,
    },
    resetButton: {
        backgroundColor: 'maroon',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginLeft: 'auto',
        marginRight: 50,
        marginBottom: 25,
    },
    applyButton: {
        backgroundColor: 'maroon',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginRight: 'auto',
        marginBottom: 25,
    },
    buttonText: {
        color: 'white',
    },
});

export default CuisineFilter;
