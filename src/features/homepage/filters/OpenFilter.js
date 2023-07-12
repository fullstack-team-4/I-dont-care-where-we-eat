import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Switch, Text, View } from "react-native";

const OpenFilter = ({ filters, states }) => {
  useEffect(() => {
    loadSwitchState();
  }, []);

  const loadSwitchState = async () => {
    try {
      const switchState = await AsyncStorage.getItem("openFilterSwitchState");
      if (switchState !== null) {
        filters.handleOpenFilter(switchState === "true");
      }
    } catch (error) {
      console.log("Error loading switch state:", error);
    }
  };

  const saveSwitchState = async (state) => {
    try {
      await AsyncStorage.setItem("openFilterSwitchState", state.toString());
    } catch (error) {
      console.log("Error saving switch state:", error);
    }
  };

  const toggleSwitch = () => {
    filters.handleOpenFilter(!states.isOpen);
  };

  useEffect(() => {
    saveSwitchState(states.isOpen);
    // onFilterApply(isEnabled);
  }, [states.isOpen]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>Open Now</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default OpenFilter;
