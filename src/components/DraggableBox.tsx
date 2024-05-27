import React, { ReactNode } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, PanGestureHandler } from "react-native-gesture-handler";

import { styles } from "../styles/styles";

type DraggableBoxProps = {
    children: ReactNode
}

export const DraggableBox: React.FC<DraggableBoxProps> = ({ children }) => {
    const boxX = useSharedValue(0);
    const boxY = useSharedValue(0);
    const boxOffsetX = useSharedValue(0);
    const boxOffsetY = useSharedValue(0);
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const redBoxAnimation = useAnimatedStyle(() => ({
        transform: [
            { translateX: boxX.value },
            { translateY: boxY.value },
            { scale: scale.value },
        ],
    }))

    const panRedBox = Gesture.Pan()
        .onUpdate((event) => {
            boxX.value = boxOffsetX.value + event.translationX;
            boxY.value = boxOffsetY.value + event.translationY;
        })
        .onEnd((event) => {
            boxOffsetX.value += event.translationX;
            boxOffsetY.value += event.translationY;
            boxX.value = withSpring(boxOffsetX.value);
            boxY.value = withSpring(boxOffsetY.value);
        });

    const pinchBox = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
        });

    const composedGesture = Gesture.Simultaneous(panRedBox, pinchBox);

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={redBoxAnimation}>
                {children}
            </Animated.View>
        </GestureDetector>
    )
}