import React, { ReactElement, ReactNode, useState } from "react";
import { View, Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { groundMap01, groundMap02 } from "../modules/terrain";
import { Button, Layout, Text } from "@ui-kitten/components";

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface PlaceTileProps {
    zIndex: number;
    source: ImageSourcePropType | null;
    position: {
        x: number;
        y: number;
    }
}
const tileWidth = 256;
const tileHeight = 128;

const PlaceTile: React.FC<PlaceTileProps> = ({ zIndex, source, position }): ReactElement => {
    if (zIndex === 1) {
        position.x -= 0.95;
        position.y -= 1.2;
    }

    const isoX = (position.x - position.y) * tileWidth; // Half the width of your tiles
    const isoY = (position.x + position.y) * tileHeight; // Half the height of your tiles
    const zHeight = zIndex === 1 ? tileHeight * 4 : tileHeight * 2;

    if (source !== null) {
        return (
            <View style={[styles.layer,
            {
                zIndex: zIndex,
                left: isoX,
                top: isoY,
                height: tileHeight,
                width: tileWidth * 2
            }]
            }>
                {/* {console.log('Position:', position.x, '-', position.y)}
                {console.log('ISO:', isoX, '-', isoY)} */}

                {console.log('zIndex', zHeight)}
                {zIndex === 0 &&
                    <Text category="h3" style={styles.console}>{`${position.x}-${position.y}`}</Text>
                }
                <Image source={source} style={{ height: zHeight, width: tileWidth * 2 }} />
            </View>
        )
    }
    else {
        1
        throw new Error("Source image for tile not defined");
    }
}

export const RenderMap: React.FC = () => {

    const grass = require('../../assets/tiles/tilable-IMG_0044-grey.png');
    const rock = require('../../assets/tiles/rock.png');
    const keep = require('../../assets/castlekeep_05.png');
    const sharedWidth = useSharedValue(100);

    return (

        <Layout style={{ flex: 1 }}>
            <>
                {groundMap01.map((row, rowIndex) => (
                    row.map((tile, colIndex) => {
                        const x = colIndex;
                        const y = rowIndex;
                        let mappedTile: ImageSourcePropType | null = null;

                        switch (tile) {
                            case 0: mappedTile = grass; break;
                            case 1: mappedTile = rock; break;
                        }
                        return (
                            <PlaceTile
                                key={`${rowIndex}-${colIndex}`}
                                zIndex={0}
                                source={mappedTile}
                                position={{
                                    x: x,
                                    y: y
                                }} />
                        )
                    })
                ))}
            </>

            {/* <PlaceTile
                zIndex={1}
                source={keep}
                position={{ x: 1, y: 1 }} /> */}
        </Layout >

    )
}

const styles = StyleSheet.create({
    tileMap: {
        flex: 1,
        position: 'relative',
    },
    tile: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    scrollView: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    console: {
        position: 'absolute'
    },
    layer: {
        position: 'absolute',
        // alignItems: 'baseline',
        // justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'yellow'
    }
})
