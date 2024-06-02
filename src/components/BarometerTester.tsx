import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Barometer } from 'expo-sensors';

export const BarometerTester: React.FC = () => {
    const [pressure, setPressure] = useState<string | null>(null);
    const [altitude, setAltitude] = useState<string | null>(null);

    useEffect(() => {
        Barometer.addListener(({ pressure: any }) => {
            setPressure(pressure);
            const altitude = calculateAltitude(pressure);
            setAltitude(altitude);
        });

        return () => {
            Barometer.removeAllListeners();
        }
    }, [])

    const calculateAltitude = (pressure: any) => {
        const seaLevelPressure = 1013.25;
        const altitude = (1 - Math.pow(pressure / seaLevelPressure, 0.190284)) * 145366.45 * 0.3048;
        return altitude.toFixed(2);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pressure: {pressure ? `${pressure} hPa` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {altitude ? `${altitude} meters` : 'N/A'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18
    }
})