import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { groundMap01 } from "../modules/terrain";
import { Button, Layout } from "@ui-kitten/components";

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const RenderMap: React.FC = () => {

    const grass = require('../../assets/tiles/tilable-IMG_0044-grey.png');
    const rock = require('../../assets/tiles/rock.png')
    const tileWidth = 128;
    const tileHeight = 64;

    const sharedWidth = useSharedValue(100);

    const handlePress = () => {
        sharedWidth.value = withSpring(sharedWidth.value + 50);
    };

    return (

        <Layout style={{ flex: 1 }}>

            {groundMap01.map((row, rowIndex) => (
                row.map((tile, colIndex) => {
                    const x = (colIndex - rowIndex) * (tileWidth / 2);
                    const y = (colIndex + rowIndex) * (tileHeight / 2);
                    return (
                        <Image
                            key={`${rowIndex}-${colIndex}`}
                            source={tile === 0 ? rock : grass}
                            style={[styles.tile, {
                                left: x + sharedWidth.value / 2,
                                top: y,
                                width: tileWidth,
                                height: tileHeight
                            }]}
                        />
                    );
                })
            ))}
        </Layout >

    )
}

const styles = StyleSheet.create({
    tileMap: {
        position: 'relative',
        top: 0,
        left: 0
    },
    tile: {
        position: 'absolute'
    },
    scrollView: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
