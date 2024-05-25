import React from "react";
import { Layout, Button } from "@ui-kitten/components";

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export const AnimationScreen: React.FC = () => {

    const width = useSharedValue(100);

    const handlePress = () => {
        width.value = withSpring(width.value + 50);
    }

    const smallerPress = () => {
        width.value = withSpring(width.value - 50);
    }

    return (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{ width: width, height: 100, backgroundColor: 'violet' }} />
            <Layout style={{ padding: 10 }}>
                <Button style={{ margin: 20 }} onPress={handlePress}>Bigger</Button>
                <Button onPress={smallerPress}>Smaller</Button>
            </Layout>
        </Layout>
    )
}