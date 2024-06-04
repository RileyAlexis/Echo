import React, { useState, useEffect } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';


export const AccelerometerTester: React.FC = () => {

    const [{ x, y, z }, setData] = useState({
        x: 0, y: 0, z: 0
    });

    const [subscription, setSubscription] = useState<any>(null);
    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    }

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    }

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, [])

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x.toFixed(4)}</Text>
            <Text style={styles.text}>y: {y.toFixed(4)}</Text>
            <Text style={styles.text}>z: {z.toFixed(4)}</Text>
            <Text style={styles.text}>{subscription ? 'On' : 'Off'}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    size='small'
                    status='success'
                    appearance='outline'
                    onPress={_slow}>Slow</Button>
                <Button
                    size='tiny'
                    status='warning'
                    appearance='ghost'
                    onPress={_fast}>Fast</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    }
})