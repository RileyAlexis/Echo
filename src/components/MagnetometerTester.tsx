import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Magnetometer, MagnetometerUncalibrated } from 'expo-sensors';

export const MagnetometerTester: React.FC = () => {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [magnitude, setMagnitude] = useState(0);
    const [subscription, setSubscription] = useState<any>(null);
    const threshhold = 15;

    const _slow = () => Magnetometer.setUpdateInterval(1000);
    const _fast = () => Magnetometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener(result => {
                setData(result);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        const calcMagnitude = Math.sqrt(x * x + y * y + z * z);
        setMagnitude(calcMagnitude);
    }, [x, y, z]);


    const getDirection = () => {
        if (magnitude > threshhold) {
            if (Math.abs(x) > Math.abs(y) && Math.abs(x) > Math.abs(z)) {
                return x > 0 ? 'Right' : 'Left';
            }
            if (Math.abs(y) > Math.abs(x) && Math.abs(y) > Math.abs(z)) {
                return y > 0 ? 'Up' : 'Down';
            }
            if (Math.abs(z) > Math.abs(x) && Math.abs(z) > Math.abs(y)) {
                return z > 0 ? 'Front' : 'Back';
            }
        }
        return 'No Significant Signal Detected';
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Magnetometer:</Text>
                <Text style={styles.text}>x: {x.toFixed(4)}</Text>
                <Text style={styles.text}>y: {y.toFixed(4)}</Text>
                <Text style={styles.text}>z: {z.toFixed(4)}</Text>
                <Text style={styles.text}>Magnitude: {magnitude.toFixed(4)}</Text>
                <Text style={styles.text}>Direction: {getDirection()}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={subscription ? _unsubscribe : _subscribe}>
                    {subscription ? 'On' : 'Off'}
                </Button>
                <Button onPress={_slow}>
                    Slow
                </Button>
                <Button onPress={_fast}>
                    Fast
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 15,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});
