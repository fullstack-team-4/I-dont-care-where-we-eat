import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CuisineFilter from './filters/CuisineFilter';
import OpenFilter from './filters/OpenFilter';
import PriceFilter from './filters/PriceFilter';
import RatingFilter from './filters/RatingFilter';
import DistanceFilter from './filters/DistanceFilter';

const FilterBar = ({ filters, activeFilter, handleFilterChange }) => {
    const refRBsheet = useRef();

    const openFilter = (filterName) => {
        handleFilterChange(filterName);
        refRBsheet.current.open();
    };

    return (
        <View>
            <View style={styles.filterBar}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => openFilter('open')}>
                    <Text>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => openFilter('cuisine')}>
                    <Text style={styles.filterText}>Cuisines</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => openFilter('price')}>
                    <Text style={styles.filterText}>Price</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => openFilter('rating')}>
                    <Text style={styles.filterText}>Rating</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={refRBsheet}
                closeOnDragDown={true}
                height={300}
                customStyles={{
                    container: {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}>
                {activeFilter === 'cuisine' && (
                    <CuisineFilter
                        onFilterApply={filters.handleCuisineFilter}
                    />
                )}
                {activeFilter === 'price' && (
                    <PriceFilter onFilterApply={filters.handlePriceFilter} />
                )}
                {activeFilter === 'rating' && (
                    <RatingFilter onFilterApply={filters.handleRatingFilter} />
                )}
                {activeFilter === 'distance' && (
                    <DistanceFilter
                        defaultValue={filters.distanceFilter}
                        onFilterApply={filters.handleDistanceFilter}
                    />
                )}
                {activeFilter === 'open' && (
                    <OpenFilter onFilterApply={filters.handleOpenFilter} />
                )}
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: '#eeeeee',
        height: 50,
        borderRadius: 25,
    },
    filterButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    filterText: {
        marginRight: 5,
    },
});

export default FilterBar;
