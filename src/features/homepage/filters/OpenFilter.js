import React, { useState, useEffect } from 'react';
import { Text, View, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OpenFilter = ({ onFilterApply }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        loadSwitchState();
    }, []);

    const loadSwitchState = async () => {
        try {
            const switchState = await AsyncStorage.getItem(
                'openFilterSwitchState'
            );
            if (switchState !== null) {
                setIsEnabled(switchState === 'true');
            }
        } catch (error) {
            console.log('Error loading switch state:', error);
        }
    };

    const saveSwitchState = async (state) => {
        try {
            await AsyncStorage.setItem(
                'openFilterSwitchState',
                state.toString()
            );
        } catch (error) {
            console.log('Error saving switch state:', error);
        }
    };

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
    };

    useEffect(() => {
        saveSwitchState(isEnabled);
        onFilterApply(isEnabled);
    }, [isEnabled]);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Text>Open Now</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default OpenFilter;
