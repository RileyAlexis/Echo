import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { Barometer } from 'expo-sensors';
import { getMetar, getStarWars } from '../modules/metarAPI';

export const BarometerTester: React.FC = () => {
    const [pressure, setPressure] = useState<number | null>(null);
    const [altitudeMeters, setAltitudeMeters] = useState<number | null>(null);
    const [altitudeFeet, setAltitudeFeet] = useState<number | null>(null);
    const [inHg, setInHg] = useState<number | null>(null);
    const [metarData, setMetarData] = useState<JSON | null>(null);

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

    const metersToFeet = (meters: number) => {
        const feet = meters * 3.28084;
        return feet;
    }

    const hPaToInHg = (hPa: number) => {
        const inHg = hPa * 0.02953;
        return inHg;
    }

    const handleMetar = async () => {
        try {
            await getMetar('KMSP');
        } catch (error) {
            console.error(error);
        }
    }

    const handleStarWars = async () => {
        await getStarWars()
            .then((response) => {
                setMetarData(response);
            }).catch((error) => {
                console.error('Star Wars Error', error);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pressure: {pressure ? `${pressure.toFixed(2)} hPa` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {altitudeMeters ? `${altitudeMeters.toFixed(2)} meters` : 'N/A'}</Text>
            <Text style={styles.text}>Pressure: {inHg ? `${inHg.toFixed(2)} inHg` : 'N/A'}</Text>
            <Text style={styles.text}>Altitude: {altitudeFeet ? `${altitudeFeet.toFixed(2)} feet` : 'N/A'}</Text>
            <Button onPress={handleStarWars}>Get METAR</Button>
            {metarData &&
                <Text style={styles.text}>
                    {JSON.stringify(metarData)}
                </Text>
            }
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