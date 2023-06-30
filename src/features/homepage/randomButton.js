import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components/native";
import { useState } from 'react';
import axios from 'axios';

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

const RandomButton = ({ onPress }) => {
    const [randomRestaurant, setRandomRestaurant] = useState(null);

    const generateRandomRestaurant = async () => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                {
                    params: {
                        location: '34.052235,-118.243683',
                        radius: 1000,
                        type: 'restaurant',
                        key: 'AIzaSyAJY4PiiBXtUQfOJHVkPpQj1twUacZk6Lo',
                    }, 
                }, console.log(response)
            );

            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const randomRestaurant = response.data.results[randomIndex];
            setRandomRestaurant(randomRestaurant);
        } catch (error) {
            console.error('Error generating random restaurant:', error);
        }
    };

    const handlePress = () => {
        generateRandomRestaurant();
        onPress(); 
        console.log('this is handlepress');
    };

    return (
        <ButtonContainer onPress={handlePress}>
            <Image
                source={require("../../../assets/idc2.png")}
                style={{ width: 300, height: 300 }}
            />
        </ButtonContainer>
    );
};

export default RandomButton;
