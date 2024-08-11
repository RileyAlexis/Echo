import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { Layout, Icon, Button } from '@ui-kitten/components';
import { styles } from '../styles/styles';
import { LocationObject } from 'expo-location';
import { LatLng } from 'react-native-maps';


type ReactNativeMapProps = {
    location: LocationObject
}

export const ReactNativeMap: React.FC<ReactNativeMapProps> = ({ location }) => {

    const mapRef = useRef<MapView>(null);
    const [tintColor, setTintColor] = useState<string>('#FF00FF');

    useEffect(() => {
        const pink = '#FF00FF';
        const blue = '#2E43FF';

        const transitionColor = () => {
            if (tintColor === pink) {
                setTintColor(blue);
            } else {
                setTintColor(pink);
            }
        }

        const timeoutId = setTimeout(transitionColor, 6000);

        return () => clearTimeout(timeoutId);
    }, [tintColor]);

    const centerMapOnUser = () => {

        console.log(location.coords.latitude);
        mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        })
    }

    return (
        <Layout style={styles.containerCentered}>
            <MapView
                ref={mapRef}
                style={{ ...StyleSheet.absoluteFillObject }}
                showsUserLocation={true}
                showsBuildings={true}
                showsMyLocationButton={true}
                showsPointsOfInterest={true} //Apple only
                showsScale={true} //Apple only
                showsIndoors={true}
                showsIndoorLevelPicker={true}
                userLocationPriority='balanced'
                userLocationUpdateInterval={2000} //Android Only
                loadingEnabled={true}
                loadingIndicatorColor='#d20353'
                tintColor={tintColor} //iOS only
                toolbarEnabled={false}

            >
                <UrlTile
                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    flipY={false}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 25,
                        padding: 10,
                        elevation: 5,
                    }}
                    onPress={centerMapOnUser}
                >
                    <Icon
                        name='pin-outline'
                        fill='#007AFF'
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>

            </MapView>
        </Layout>
    )
}