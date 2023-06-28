import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// Import the screen components here
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";

const Drawer = createDrawerNavigator();
const FilterBar = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Screen1">
        <Drawer.Screen name="Screen1" component={Screen1} />
        <Drawer.Screen name="Screen2" component={Screen2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default FilterBar;
