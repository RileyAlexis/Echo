import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { styles } from "../styles/styles";
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
    withDelay
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const AnimationScreen: React.FC = () => {

    const width = useSharedValue<number>(100);
    const translateX = useSharedValue<number>(0);
    const translateY = useSharedValue<number>(0);
    const offset = useSharedValue<number>(0);
    const shakerOffset = 15;
    const shakerTimer = 150;
    const shakerDelay = 100;
    const panOffset = useSharedValue(0);
    const r = useSharedValue(10);
    const pressedTap = useSharedValue(false);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const moveRight = () => {
        translateX.value = withSpring(translateX.value + 50);
        // translateX.value = withSpring(translateX.value + 50);
    }

    const moveLeft = () => {
        translateX.value = withSpring(translateX.value - 50);
        // translateX.value = withTiming(translateX.value - 50);
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
        .onBegin(() => {
            pressedTap.value = true;
        })
        .onChange((event) => {
            panOffset.value = event.translationX;
        })
        .onFinalize(() => {
            panOffset.value = withSpring(0);
            pressedTap.value = false;
        });

    const animatePan = useAnimatedStyle(() => ({
        backgroundColor: pressedTap.value ? '#FFE04B' : '#B58DF1',
        transform: [
            { translateX: panOffset.value },
            { scale: withTiming(pressedTap.value ? 1.2 : 1) }],
    }));

    return (
        <SafeAreaView>
            <View style={[styles2.container, { backgroundColor: 'darkgray' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[styles2.box, animatedElasticStyles]} />
                    <Animated.View style={[styles2.box2, animatedSpringStyles]} />
                </View>
                <View style={{ marginTop: 100 }}>
                    <Animated.View style={[styles2.box3, shakerThing]} />
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[styles2.circle, animatePan]} />
                    </GestureDetector>
                </View>
                <View
                    style={{
                        marginTop: 400,
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                    }}>
                    <Button style={styles2.button} onPress={moveLeft}>Left</Button>
                    <Button style={styles2.button} onPress={moveRight}>Right</Button>
                    <Animated.View style={shakerThing}>
                        <Button style={styles2.button} onPress={shakeTheBox}>Shaker</Button>
                    </Animated.View>
                    {/* <Button style={styles2.button} onPress={moveCircle}>Move Circle</Button> */}
                </View>
                <Svg style={styles2.circle}>
                    <AnimatedCircle
                        cx="40%"
                        cy="40%"
                        fill="violet"
                        animatedProps={animatedProps}
                    />
                </Svg>

            </View>
        </SafeAreaView >

    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    box: {
        backgroundColor: 'violet',
        width: 50,
        height: 50,
        borderRadius: 20
    },
    box2: {
        backgroundColor: 'green',
        width: 50,
        height: 50,
        borderRadius: 20
    },
    box3: {
        backgroundColor: 'purple',
        width: 50,
        height: 50,
        borderRadius: 20
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 30
    },
    button: {
        position: 'relative',
        // top: 200,
        height: 60,
        margin: 20
    }
})