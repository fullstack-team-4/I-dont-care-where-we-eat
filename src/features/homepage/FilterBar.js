import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CuisineFilter from "./filters/CuisineFilter";
import OpenFilter from "./filters/OpenFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";

const FilterBar = ({ filters, handleFilterChange }) => {
  const refRBsheetOpen = useRef();
  const refRBsheetCuisine = useRef();
  const refRBsheetPrice = useRef();
  const refRBsheetRating = useRef();
  // const refRBsheetDistance = useRef();

  return (
    <View>
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleFilterChange("open");
            refRBsheetOpen.current.open();
          }}
        >
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleFilterChange("cuisine");
            refRBsheetCuisine.current.open();
          }}
        >
          <Text style={styles.filterText}>Cuisines</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleFilterChange("price");
            refRBsheetPrice.current.open();
          }}
        >
          <Text style={styles.filterText}>Price</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handleFilterChange("rating");
            refRBsheetRating.current.open();
          }}
        >
          <Text style={styles.filterText}>Rating</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
      </View>


      <RBSheet
        ref={refRBsheetOpen}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <OpenFilter onFilterApply={filters.handleOpenFilter} />
      </RBSheet>

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
    backgroundColor: "#eeeeee",
    height: 50,
    borderRadius: 25,
  },

  filterButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  filterText: {
    marginRight: 5,
  },
});

export default FilterBar;
