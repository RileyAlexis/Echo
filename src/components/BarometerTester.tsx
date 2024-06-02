import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { Barometer } from 'expo-sensors';
import { getMetar, getStarWars } from '../modules/metarAPI';

export const BarometerTester: React.FC = () => {
    const [pressure, setPressure] = useState<number | null>(null);
    const [altitudeMeters, setAltitudeMeters] = useState<number | null>(null);
    const [altitudeFeet, setAltitudeFeet] = useState<number | null>(null);
    const [inHg, setInHg] = useState<number | null>(null);
    const [metarData, setMetarData] = useState<string | null>(null);
    const [locationPressure, setLocationPressure] = useState<number | null>(null);
    const [starwarsData, setStarwarsData] = useState<JSON | null>(null);

    useEffect(() => {
        Barometer.addListener(({ pressure }) => {
            setPressure(pressure);
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                const altitudeMeters = calculateAltitude(pressure);
                setAltitudeMeters(altitudeMeters);
                setAltitudeFeet(metersToFeet(altitudeMeters))
                setInHg(hPaToInHg(pressure));
            }
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

    const feetToMeters = (feet: number) => {
        const meters = feet / 3.28084;
        return meters;
    }

    const hPaToInHg = (hPa: number) => {
        const inHg = hPa * 0.02953;
        return inHg;
    }

    const inHgTohPa = (inHg: number) => {
        const hPa = inHg / 0.02953;
        return hPa;
    }

    const extractInHg = (metar: string): number | null => {
        const regex = /\bA(\d{2})(\d{2})\b/;
        const match = regex.exec(metar);
        if (match) {
            const pressureValue = `${match[1]}.${match[2]}`;
            return parseFloat(pressureValue);
        }
        return null;
    }

    const handleMetar = async () => {
        await getMetar('KFCM')
            .then((response) => {
                setMetarData(response);
                const data = extractInHg(response);
                setLocationPressure(data);
            }).catch((error) => {
                console.error("Error getting METAR data", error);
            })
    }

    const handleStarWars = async () => {
        await getStarWars()
            .then((response) => {
                setStarwarsData(response);
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
            <Button onPress={handleMetar}>Get METAR</Button>
            {locationPressure &&
                <>
                    <Text style={styles.text}>
                        Pressure inHg: {locationPressure}
                    </Text>
                    {metarData &&
                        <Text style={styles.text}>
                            METAR: {metarData}
                        </Text>
                    }
                </>
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