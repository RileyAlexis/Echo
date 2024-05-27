import React from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";

import { styles } from "../styles/styles";

export const DraggableBox: React.FC = () => {
    const redBoxX = useSharedValue(0);
    const redBoxY = useSharedValue(0);
    const redBoxOffsetX = useSharedValue(0);
    const redBoxOffsetY = useSharedValue(0);

    const redBoxAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: redBoxX.value }, { translateY: redBoxY.value }],
    }))

    const panRedBox = Gesture.Pan()
        .onUpdate((event) => {
            redBoxX.value = redBoxOffsetX.value + event.translationX;
            redBoxY.value = redBoxOffsetY.value + event.translationY;
        })
        .onEnd((event) => {
            redBoxOffsetX.value += event.translationX;
            redBoxOffsetY.value += event.translationY;
            redBoxX.value = withSpring(redBoxOffsetX.value);
            redBoxY.value = withSpring(redBoxOffsetY.value);
        });

    return (
        <GestureDetector gesture={panRedBox}>
            <Animated.View style={[local.redBox, redBoxAnimation]} />
        </GestureDetector>
    )
}

const local = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'pink',
        height: '50%',
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    redBox: {
        width: 70,
        height: 70,
        backgroundColor: 'crimson',
        borderRadius: 20
    }
})