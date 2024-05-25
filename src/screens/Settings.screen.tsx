import React from "react";
import { Text, Layout, Icon, TopNavigationAction, IconElement, Button } from '@ui-kitten/components';
import { Image } from 'react-native';
import { styles } from "../styles/styles";

import { RenderMap } from "../components/RenderMap";

interface SettingsProps {
    navigation: any;
}

const BackIcon: React.FC = (): IconElement => {
    return (
        <Icon
            style={{ width: 32, height: 32 }}
            name='arrow-back' />
    );
};


export const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );


    return (
        <>
            <Layout style={styles.container}>
                <Text>
                    Settings Screen
                </Text>
                <RenderMap />
            </Layout>
        </>
    );
};

