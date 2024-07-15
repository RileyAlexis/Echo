import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@ui-kitten/components";
import { Circle, Svg } from "react-native-svg";
import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    useAnimatedStyle,
    useAnimatedProps,
    Easing,
    withRepeat,
    withSequence,
    withDelay,
    withDecay
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const BasicAnimations: React.FC = () => {

    const translateX = useSharedValue<number>(0);
    const translateY = useSharedValue<number>(0);
    const width = useSharedValue(0);
    const offset = useSharedValue<number>(0);
    const shakerOffset = 15;
    const shakerTimer = 150;
    const shakerDelay = 100;
    const panSize = 0;
    const panOffset = useSharedValue(0);
    const r = useSharedValue(10);
    const pressedTap = useSharedValue(false);
    const elasticTap = useSharedValue(false);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const onLayout = (event: any) => {
        width.value += event.nativeEvent.layout.width;
    }

    const moveRight = () => {
        translateX.value = withSpring(translateX.value + 50);
        // translateX.value = withSpring(translateX.value + 50);
    }

    const moveLeft = () => {
        translateX.value = withSpring(translateX.value - 50);
        // translateX.value = withTiming(translateX.value - 50)
    }

    const shakeTheBox = () => {
        offset.value =
            withDelay(shakerDelay,
                withSequence(
                    // start from -shakerOffset (minus)
                    withTiming(-shakerOffset, { duration: shakerTimer / 2 }),
                    // shake between -shakerOffset and +shakerOffset 5 times
                    withRepeat(withTiming(shakerOffset, { duration: shakerTimer }), 6, true),
                    // go back to 0 at the end of the animation - withTiming(0) resets it to starting point
                    withTiming(0, { duration: shakerTimer / 2 })
                ));
    };

    const shakerThing = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const animatedElasticStyles = useAnimatedStyle(() => ({
        transform: [{
            translateX: withTiming(translateX.value * 2, {
                duration: 50,
                easing: Easing.in(Easing.elastic(5))
            })
        }]
    }));

    const animatedSpringStyles = useAnimatedStyle(() => ({
        transform: [{
            translateX: withSpring(translateX.value * 2, {
                mass: 5,
                damping: 20,
                stiffness: 500,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 50
            })
        }]
    }));

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value)
    }))

    const moveCircle = () => {
        r.value += 10;
    }

    const pan = Gesture.Pan()
        .onBegin((event) => {
            pressedTap.value = true;
        })
        .onChange((event) => {
            // panOffset.value = event.translationX;
            panOffset.value = event.changeX;
        })
        .onFinalize((event) => {
            panOffset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [-(width.value / 2) + panSize / 2, width.value / 2 - panSize / 2],
            })
            // panOffset.value = withSpring(0);
            pressedTap.value = false;
        });

    const animatePan = useAnimatedStyle(() => ({
        backgroundColor: pressedTap.value ? '#FFE04B' : '#B58DF1',
        transform: [
            { translateX: panOffset.value },
            { scale: withTiming(pressedTap.value ? 1.2 : 1) }],
    }));


    return (
        <View style={[styles2.container, { backgroundColor: 'darkgray' }]}>
            <View style={{
                flexDirection: 'column',
                borderWidth: 2,
                borderColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Animated.View style={[styles2.box, animatedElasticStyles]} />
                <Animated.View style={[styles2.box2, animatedSpringStyles]} />
                <Animated.View style={[styles2.box3, shakerThing]} />

                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles2.circle, animatePan]} />
                </GestureDetector>
                <Svg style={styles2.circle}>
                    <AnimatedCircle
                        cx="50%"
                        cy="50%"
                        fill="orange"
                        animatedProps={animatedProps}
                    />
                </Svg>
            </View>

            <View
                style={{
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: 'black'
                }}>
                <Button style={styles2.button} onPress={moveLeft}>Left</Button>
                <Button style={styles2.button} onPress={moveRight}>Right</Button>

                <Animated.View style={shakerThing}>
                    <Button style={styles2.button} onPress={shakeTheBox}>Shaker</Button>
                </Animated.View>

                <Button style={styles2.button} onPress={moveCircle}>Move Circle</Button>
            </View>
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'blue'
    },
    box: {
        backgroundColor: 'violet',
        width: 50,
        height: 50,
        borderRadius: 20,
        margin: 10
    },
    box2: {
        backgroundColor: 'green',
        width: 50,
        height: 50,
        borderRadius: 20,
        margin: 10

    },
    box3: {
        backgroundColor: 'purple',
        width: 50,
        height: 50,
        borderRadius: 20,
        margin: 10
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        margin: 10

    },
    button: {
        height: 50,
        margin: 5
    }
})