import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import Constants from 'expo-constants';

import { styles } from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';
export const AccelerometerTester: React.FC = () => {

    return (
        <View>
            <Text>Stuff</Text>
            <ScrollView>
                <Text>{Constants.systemFonts}</Text>
            </ScrollView>
        </View>
    )
}