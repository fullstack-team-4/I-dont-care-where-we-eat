import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  CuisineFilter,
  PriceFilter,
  RatingFilter,
} from "./filters";

const FilterBar = ({
  filters,
  states,
}) => {

  const refRBsheetCuisine = useRef();
  const refRBsheetPrice = useRef();
  const refRBsheetRating = useRef();
  
  const handleOpenFilter = () => {
    filters.handleOpenFilter(states.isOpen);
  };
  return (
    <View>
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            states.isOpen ? styles.appliedFilter : null,
          ]}
          onPress={handleOpenFilter}
        >
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            states.cuisineFilters.length > 0 ? styles.appliedFilter : null,
          ]}
          onPress={() => {
            filters.handleFilterChange("cuisine");
            refRBsheetCuisine.current.open();
          }}
        >
          <Text style={styles.filterText}>Cuisines</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            states.priceFilters ? styles.appliedFilter : null,
          ]}
          onPress={() => {
            filters.handleFilterChange("price");
            refRBsheetPrice.current.open();
          }}
        >
          <Text style={styles.filterText}>Price</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            states.ratingFilter ? styles.appliedFilter : null,
          ]}
          onPress={() => {
            filters.handleFilterChange("rating");
            refRBsheetRating.current.open();
          }}
        >
          <Text style={styles.filterText}>Rating</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

     
      <RBSheet
        ref={refRBsheetCuisine}
        closeOnDragDown={true}
        height={480}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <CuisineFilter onFilterApply={filters.handleCuisineFilter} />
      </RBSheet>

      <RBSheet
        ref={refRBsheetPrice}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <PriceFilter onFilterApply={filters.handlePriceFilter} />
      </RBSheet>

      <RBSheet
        ref={refRBsheetRating}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <RatingFilter onFilterApply={filters.handleRatingFilter} />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    height: 50,
  },

  filterButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    minHeight: '90%'
  },
  filterText: {
    marginRight: 5,
  },
  appliedFilter: {
    borderColor: "maroon",
    backgroundColor: "rgba(128, 0, 0, 0.3)",
    borderWidth: 1,
  },
});

export default FilterBar;
