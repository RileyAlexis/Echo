import React, { useRef, useEffect, for } from "react";
import { View } from 'react-native';
import Canvas from 'react-native-canvas';
import planck from 'planck-js';
import { SkiaCanvas } from "./SkiaCanvas";

export const PhysicsBox: React.FC = () => {

    const worldRef = useRef<planck.World | null>(null);
    const circleRef = useRef<planck.Body | null>(null);

    useEffect(() => {
        const world = planck.World();
        worldRef.current = world;
        const circle = world.createBody({
            type: 'dynamic',
            position: planck.Vec2(50, 50),
        });
        circle.createFixture(planck.Circle(10), { density: 1, friction: 0.3 });
        circleRef.current = circle;

        const ground = world.createBody();
        ground.createFixture(planck.Edge(planck.Vec2(0, 100), planck.Vec2(200, 200)), 0);

        const update = () => {
            world.step(1 / 60);
            requestAnimationFrame(update);
        };
        update();
    }, []);

    const handleCanvas = (canvas: any) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;

        const render = () => {
            const circle: any = circleRef.current;
            const position: any = circle.getPosition();

            ctx.clearReact(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.stroke();

            requestAnimationFrame(render);
        }
    }

    return (
        <View>
            <Canvas ref={handleCanvas} />
        </View>
    )
}