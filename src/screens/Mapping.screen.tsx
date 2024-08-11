import React, { useEffect, useState } from 'react';
import { ReactNativeMap } from '../components/ReactNativeMap';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { Platform } from 'expo-modules-core';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from '../styles/styles';


//44.9560534624369, -93.16002444658359

export const MappingScreen: React.FC = () => {

    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [textDisplay, setTextDisplay] = useState<string>('Getting Location...')

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Location permissions were denied');
            return;
        }

        // if (Platform.OS === 'ios') {
        //     let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        //     if (backgroundStatus !== 'granted') {
        //         setErrorMsg('Background location permission denied');
        //         return;
        //     }
        // }

        let loc: LocationObject = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };

    useEffect(() => {
        if (errorMsg) {
            setTextDisplay(errorMsg);
        } else if (location) {
            setTextDisplay(JSON.stringify(location));
        }
    }, [location, errorMsg])


    useEffect(() => {
        requestLocationPermission();
    }, [])


    return (
        // <Layout style={styles.containerCentered}>
        //     <Text>{textDisplay}</Text>
        // </Layout>
        <ReactNativeMap location={location} />


    )
}