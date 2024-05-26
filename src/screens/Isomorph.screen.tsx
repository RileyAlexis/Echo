import React from "react";
import { Layout, Icon, TopNavigationAction, IconElement } from '@ui-kitten/components';
import { styles } from "../styles/styles";

import { RenderMap } from "../components/RenderMap";

interface IsomorphProps {
    navigation: any;
}

const BackIcon: React.FC = (): IconElement => {
    return (
        <Icon
            style={{ width: 32, height: 32 }}
            name='arrow-back' />
    );
};


export const Isomorph: React.FC<IsomorphProps> = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );


    return (
        <Layout style={styles.container}>
            <RenderMap />
        </Layout>
    );
};
