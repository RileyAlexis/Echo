import React, { ReactNode } from 'react';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';

type SkiaCanvasProps = {
    width: number,
    height: number,
    children: ReactNode
}

export const SkiaCanvas: React.FC<SkiaCanvasProps> = ({ width, height, children }) => {
    return (
        <Canvas style={{ width, height }}>
            {children}
        </Canvas>
    );

}