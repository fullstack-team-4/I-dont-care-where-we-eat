import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components/native";

const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  margin-left: 8px;
`;

const RandomButton = ({ onPress }) => (
  <ButtonContainer onPress={onPress}>
    <Image source={require("../../../assets/idc2.png")} style={{ width: 300, height: 300 }} />
  </ButtonContainer>
);

export default RandomButton;
