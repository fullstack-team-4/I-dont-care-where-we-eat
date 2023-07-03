import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, Menu } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import CuisineFilter from "./filters/CuisineFilter";
import OpenFilter from "./filters/OpenFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";

const FilterBar = () => {
  const refRBsheet = useRef();
  const [activeFilter, setActiveFilter] = useState(null);
  // const [visible, setVisible] = useState(false);

  // const openMenu = () => setVisible(true);
  // const closeMenu = () => setVisible(false);

  const openFilter = (filterType) => {
    setActiveFilter(filterType);
    refRBsheet.current.open();
    // setVisible(false); // Close the menu after selecting a filter
  };

  const getFilterContent = () => {
    switch (activeFilter) {
      case "open":
        return <OpenFilter />;
      case "cuisines":
        return <CuisineFilter />;
      case "price":
        return <PriceFilter />;
      case "rating":
        return <RatingFilter />;
      default:
        return null;
    }
  };

  return (
    <View>
      <View
        // { Top navigation bar }
        style={styles.filterBar}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openFilter("open")}
        >
          <Text>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openFilter("cuisines")}
        >
          <Text style={styles.filterText}>Cuisines</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openFilter("price")}
        >
          <Text style={styles.filterText}>Price</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => openFilter("rating")}
        >
          <Text style={styles.filterText}>Rating</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet component */}
      <RBSheet
        ref={refRBsheet}
        closeOnDragDown={true}
        height={300}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {getFilterContent()}
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
  },
  filterText: {
    marginRight: 5,
  },
});

export default FilterBar;
