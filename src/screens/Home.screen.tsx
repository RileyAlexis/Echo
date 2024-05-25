import React from "react";
import { Layout, Divider, Button, Text, Icon, IconElement } from '@ui-kitten/components';

import { styles } from "../styles/styles";
import { BasicCard } from "../components/BasicCard";

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

            <Layout style={styles.container}>
                <Text style={styles.pinkText} category='h2'>Things go Here</Text>
                <Divider />
                <Button
                    accessoryLeft={homeIcon}
                    style={{ margin: 15 }}>Home</Button>
                <Layout level='2'>
                    <Text category='s1'>This is some text inside another layout box which should have
                        a different background taken from the theme</Text>
                </Layout>
                <Layout level='3' style={{ padding: 5, margin: 10 }}>
                    <Text category='s1' appearance='hint'>Hint Text</Text>
                    <Divider />
                    <Text category='s1' appearance='alternative'>Alternative Text</Text>
                </Layout>

                <Layout level='1'
                    style={{ flexDirection: 'row' }}
                >
                    <BasicCard />
                    <BasicCard />
                </Layout>
            </Layout>
        </>
    )
}