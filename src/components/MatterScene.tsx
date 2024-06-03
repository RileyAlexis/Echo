import React from "react";
import Matter from 'matter-js';
import { Circle, Group } from "@shopify/react-native-skia";
import { SkiaCanvas } from "./SkiaCanvas";

export const MatterScene: React.FC = () => {
    const width = 256;
    const height = 256;
    const r = width * 0.33;

    const engine = Matter.engine;

    return (
        <SkiaCanvas width={width} height={height}>
            <Group blendMode="multiply">
                <Circle cx={r} cy={r} r={r} color="cyan" />
                <Circle cx={width - r} cy={r} r={r} color="magenta" />
                <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
            </Group>
        </SkiaCanvas>
    )
}