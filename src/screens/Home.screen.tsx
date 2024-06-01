import React from "react";
import { Layout, Divider, Button, Text, Icon, IconElement } from '@ui-kitten/components';

import { styles } from "../styles/styles";
import { BasicCard } from "../components/BasicCard";
import { AccelerometerTester } from "../components/AccelerometerTester";

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
        <>
            {/* <TopNavigation title="Echo" alignment="center" />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={navigateSettings}>Settings</Button>

            </Layout> */}

            <Layout style={styles.containerCentered}>
                <AccelerometerTester />
            </Layout>
        </>
    )
}