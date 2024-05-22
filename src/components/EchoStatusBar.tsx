import React from "react";
import { StatusBar, View } from "react-native";
import { Text, Layout } from '@ui-kitten/components';
import type { StatusBarStyle } from "react-native";

export const EchoStatusBar: React.FC = () => {
    return (
        <Layout level='4'>
            <StatusBar
                animated={true}
                // backgroundColor={eva.dark}
                barStyle={'dark-content'}
                showHideTransition={'none'}
                hidden={false}
            />
            <Text>
                Status Bar:
            </Text>
        </Layout>
    )
}