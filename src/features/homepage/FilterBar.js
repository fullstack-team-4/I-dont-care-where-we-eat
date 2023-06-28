import React, { useRef, useState } from "react";
import { View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import CuisineFilter from "./filters/CuisineFilter";
import OpenFilter from "./filters/OpenFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";

const FilterBar = () => {
  const refRBsheet = useRef();
  const [activeFilter, setActiveFilter] = useState(null);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openFilter = (filterType) => {
    setActiveFilter(filterType);
    refRBsheet.current.open();
    setVisible(false); // Close the menu after selecting a filter
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
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 50,
          backgroundColor: "#eeeeee",
          height: 50,
          borderRadius: 25,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <IconButton
              icon="menu"
              color="#0000"
              size={20}
              onPress={() => setVisible(!visible)}
            />
          }
        >
          <Menu.Item onPress={() => openFilter("open")} title="Open" />
          <Menu.Item onPress={() => openFilter("cuisines")} title="Cuisines" />
          <Menu.Item onPress={() => openFilter("price")} title="Price" />
          <Menu.Item onPress={() => openFilter("rating")} title="Rating" />
        </Menu>
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
