import React from "react";
import { Layout, Divider, Button, Text, Icon, IconElement } from '@ui-kitten/components';

import { styles } from "../styles/styles";
import { BasicCard } from "../components/BasicCard";
import { AccelerometerTester } from "../components/AccelerometerTester";
import { BarometerTester } from "../components/BarometerTester";
import { MagnetometerTester } from "../components/MagnetometerTester";

interface HomeScreenProps {
    navigation: any
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const homeIcon = (): IconElement => {
        return (
            <Icon
                style={{ width: 32, height: 32 }}
                fill='#8F9BB3'
                name='home-outline' />
        );
    };

    // const navigateSettings = () => {
    //     navigation.navigate('Settings');
    // }

    return (
        <Layout style={styles.containerCentered}>
            {/* <AccelerometerTester /> */}
            <BarometerTester />
            {/* <MagnetometerTester /> */}
        </Layout>
    )
}