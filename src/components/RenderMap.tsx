import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { groundMap01 } from "../modules/terrain";

const { width, height } = Dimensions.get('window');

export const RenderMap: React.FC = () => {

    const scale = useSharedValue(1);
    const grass = require('../../assets/tiles/tilable-IMG_0044-grey.png');
    const rock = require('../../assets/tiles/rock.png')
    const tileWidth = 128;
    const tileHeight = 64;


    // const onPinchEvent = Animated.event


    return (
        <View style={styles.tileMap}>

            {groundMap01.map((row, rowIndex) => (
                row.map((tile, colIndex) => {
                    const x = (colIndex - rowIndex) * (tileWidth / 2);
                    const y = (colIndex + rowIndex) * (tileHeight / 2);
                    return (
                        <Image
                            key={`${rowIndex}-${colIndex}`}
                            source={tile === 0 ? rock : grass}
                            style={[styles.tile, { left: x + width / 2, top: y, width: tileWidth, height: tileHeight }]}
                        />
                    );
                })
            ))}



        </View>
    )
}

const styles = StyleSheet.create({
    tileMap: {
        position: 'relative',
        top: 100,
        width: width,
        height: height,
    },
    tile: {
        position: 'absolute'
    }
})
