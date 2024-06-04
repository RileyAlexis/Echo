import React, { CanvasHTMLAttributes, useEffect, useRef, useState } from "react";
import { View } from 'react-native';
import { Canvas, Skia, Paint, Circle, Group } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";
import { Engine, Render, World, Bodies } from "matter-js";
import { useWindowDimensions } from "react-native";

import { SkiaCanvas } from "./SkiaCanvas";

export const MatterScene: React.FC = () => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const r = useSharedValue(width * 0.15);
    const x = useSharedValue(width / 2);
    const y = useSharedValue(height / 2);
    const xOffSet = useSharedValue(0);
    const yOffSet = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            x.value = xOffSet.value + event.translationX;
            y.value = yOffSet.value + event.translationY;
        })
        .onEnd((event) => {
            xOffSet.value += event.translationX;
            yOffSet.value += event.translationY;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            r.value = savedScale.value * event.scale;
        })
        .onEnd((event) => {
            savedScale.value = r.value;
        });

    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        top: -r.value,
        left: -r.value,
        width: r.value * 2,
        height: r.value * 2,
        transform: [{ translateX: x.value }, { translateY: y.value }, { scale: scale.value }],
    }));

    const composedGesture = Gesture.Simultaneous(gesture, pinchGesture)

    useEffect(() => {
        console.log(width);
    }, []);

    return (
        <>
            <SkiaCanvas width={width} height={height}>
                <Circle cx={x} cy={y} r={r} color="red" />
            </SkiaCanvas>
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={style} />
            </GestureDetector>
        </>
    )
}