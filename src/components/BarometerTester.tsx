import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Barometer } from 'expo-sensors';

export const BarometerTester: React.FC = () => {
    const [pressure, setPressure] = useState<number | null>(null);
    const [altitudeMeters, setAltitudeMeters] = useState<number | null>(null);
    const [altitudeFeet, setAltitudeFeet] = useState<number | null>(null);
    const [inHg, setInHg] = useState<number | null>(null);

    useEffect(() => {
        Barometer.addListener(({ pressure }) => {
            setPressure(pressure);
            const altitudeMeters = calculateAltitude(pressure);
            setAltitudeMeters(altitudeMeters);
            setAltitudeFeet(metersToFeet(altitudeMeters))
            setInHg(hPaToInHg(pressure));
        });

        return () => {
            Barometer.removeAllListeners();
        }
    }, [])

    const calculateAltitude = (pressure: number) => {
        const seaLevelPressure = 1013.25;
        const altitude = (1 - Math.pow(pressure / seaLevelPressure, 0.190284)) * 145366.45 * 0.3048;
        return altitude;
    }

    const metersToFeet = (meters) => {
        const feet = meters * 3.28084;
        return feet;
    }

    const hPaToInHg = (hPa) => {
        const inHg = hPa * 0.02953;
        return inHg;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pressure: {pressure ? `${pressure.toFixed(4)} hPa` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {altitudeMeters ? `${altitudeMeters.toFixed(2)} meters` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {altitudeFeet ? `${altitudeFeet.toFixed(2)} feet` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {inHg ? `${inHg.toFixed(2)} inHg` : 'N/A'}</Text>
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