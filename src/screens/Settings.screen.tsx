import React from "react";
import { Text, Layout, Icon, TopNavigation, TopNavigationAction, IconElement, Button } from '@ui-kitten/components';
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../styles/styles";

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
                <Layout>
                    <Button onPress={navigateBack}>Back</Button>
                </Layout>
                <Text>
                    {navigation.index}
                </Text>
            </Layout>
        </>
    );
};
