import React from "react";
import { StatusBar, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components/native";
import RandomButton from "../homepage/randomButton";
import FilterBar from "../homepage/FilterBar";
import DistanceFilter from "../homepage/filters/DistanceFilter";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
  });
  

export const HomeScreen = ({ filters, states }) => {
  return (
    <SafeArea>
            <ImageBackground
    source={require('../../../assets/home-backg.avif')}
    style={styles.backgroundImage}
  >
      <ScrollView>
        <FilterBar filters={filters} states={states} />
        <DistanceFilter defaultValue={states} filters={filters} />
        <RandomButton states={states} />
      </ScrollView>
            </ImageBackground>
    </SafeArea>
  );
};
