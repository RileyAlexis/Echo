import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { styles } from "../styles/styles";
import { Circle, Svg } from "react-native-svg";

import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, useAnimatedProps } from 'react-native-reanimated';
import { SafeAreaFrameContext } from "react-native-safe-area-context";

export const AnimationScreen: React.FC = () => {

    const width = useSharedValue<number>(100);
    const translateX = useSharedValue<number>(0);
    const r = useSharedValue(10);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const handlePress = () => {
        // width.value = withSpring(width.value + 50);
        translateX.value = withSpring(translateX.value + 50);
    }

    const smallerPress = () => {
        // width.value = withSpring(width.value - 50);
        translateX.value = withSpring(translateX.value - 50);
    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }]
    }));

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value)
    }))

    const moveCircle = () => {
        r.value += 10;
    }

    return (
        <View style={[styles.container, { backgroundColor: 'darkgray' }]}>
            {/* <View style={{ top: 250 }}>
                <Animated.View style={[styles2.box, animatedStyles]} />


                <Button style={{ margin: 20 }} onPress={handlePress}>Bigger</Button>
                <Button style={{ margin: 20 }} onPress={smallerPress}>Smaller</Button> */}


            <Svg>
                <AnimatedCircle
                    cx="100"
                    cy="600"
                    fill="green"
                    animatedProps={animatedProps}
                />
            </Svg>
            <Button onPress={moveCircle}>Move Circle</Button>
        </View>
        // </View>

    )
}

const styles2 = StyleSheet.create({
    box: {
        backgroundColor: 'violet',
        width: 50,
        height: 50
    }
})