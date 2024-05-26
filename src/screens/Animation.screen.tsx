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
    withRepeat
} from 'react-native-reanimated';

export const AnimationScreen: React.FC = () => {

    const width = useSharedValue<number>(100);
    const translateX = useSharedValue<number>(0);
    const translateY = useSharedValue<number>(0);
    const offset = useSharedValue<number>(0);
    const shakerOffset = 40;
    const r = useSharedValue(10);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const moveRight = () => {
        translateX.value = withSpring(translateX.value + 50);
        offset.value = withTiming(shakerOffset);
        // translateX.value = withSpring(translateX.value + 50);
    }

    const moveLeft = () => {
        translateX.value = withSpring(translateX.value - 50);
        offset.value = withTiming(-shakerOffset);
        // translateX.value = withTiming(translateX.value - 50);
    }

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

    return (
        <SafeAreaView>
            <View style={[styles2.container, { backgroundColor: 'darkgray' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[styles2.box, animatedElasticStyles]} />
                    <Animated.View style={[styles2.box2, animatedSpringStyles]} />
                </View>
                <View style={{ marginTop: 100 }}>
                    <Animated.View style={[styles2.box3, shakerThing]} />
                </View>
                <View
                    style={{
                        marginTop: 400,
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                    }}>
                    <Button style={styles2.button} onPress={moveLeft}>Left</Button>
                    <Button style={styles2.button} onPress={moveRight}>Right</Button>
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
    button: {
        position: 'relative',
        // top: 200,
        height: 60,
        margin: 20
    },
    circle: {
        zIndex: 0
    }
})