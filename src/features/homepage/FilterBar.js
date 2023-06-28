import React, { useRef, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import CuisineFilter from "./filters/CuisineFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import RBSheet from "react-native-raw-bottom-sheet";

const FilterBar = () => {
  const refRBsheet = useRef();
  const [activeFilter, setActiveFilter] = useState(null);

  const openFilter = (filterType) => {
    setActiveFilter(filterType);
    refRBsheet.current.open();
  };

  const getFilterContent = () => {
    switch (activeFilter) {
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
        style={{ flexDirection: "row", justifyContent: "space-around", marginTop:50 }}
      >
        <TouchableOpacity onPress={() => openFilter("cuisines")}>
          <Text>Cuisines</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openFilter("price")}>
          <Text>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openFilter("rating")}>
          <Text>Rating</Text>
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

export default FilterBar;
