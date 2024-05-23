import React from "react";
import { Layout, Divider, Button, Text, Icon, IconElement } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

import { EchoStatusBar } from "../components/EchoStatusBar";
import { BasicCard } from "../components/BasicCard";

export const HomeScreen: React.FC = () => {

    const homeIcon = (): IconElement => {
        return (
            <Icon
                style={{ width: 32, height: 32 }}
                fill='#8F9BB3'
                name='home-outline' />
        );
    };

    return (
        <>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainView: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    pinkText: {
        color: '#ff00cb',
        padding: 15
    }
});