import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { Layout, Icon, Button } from '@ui-kitten/components';
import { styles } from '../styles/styles';
import { LocationObject } from 'expo-location';
import { BathroomType } from '../types/interfaces';

type ReactNativeMapProps = {
    location: LocationObject
}

export const ReactNativeMap: React.FC<ReactNativeMapProps> = ({ location }) => {

    const mapRef = useRef<MapView>(null);
    const [tintColor, setTintColor] = useState<string>('#FF00FF');
    const [bathrooms, setBathrooms] = useState<BathroomType[] | null>(null);
    let bathroomDetailsArray: BathroomType[] | null = null;
    // const toiletIcon = require('../../assets/toilet-marker.png');

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
    useEffect(() => {
        const getBathroomData = () => {
            fetch('http://192.168.50.148:5001/api/bathroomsRequest/')
                .then(response => response.json())
                .then(data => {
                    setBathrooms(data);
                    bathroomDetailsArray = data;
                    // console.log(data[0]);
                }).catch(error => {
                    console.error(error);
                })
        }
        getBathroomData();
    }, []);

    useEffect(() => {
        if (bathrooms !== null) {
            console.log(bathrooms[0]);
        } else {
            console.log('Null');
        }

        if (bathroomDetailsArray !== null) {
            console.log(bathroomDetailsArray[0]);
        } else {
            console.log('Non-state var null');
        }
    }, [bathrooms, bathroomDetailsArray])




    return (
        <Layout style={styles.containerCentered}>
            <MapView
                ref={mapRef}
                style={{ ...StyleSheet.absoluteFillObject }}
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }}
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
                {bathrooms?.map((item, index) => (
                    <Marker
                        key={index}
                        title={item.name}
                        pinColor='#d20356'
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        identifier={item.api_id}
                        opacity={0.8}
                        image={{ uri: 'toilet-marker', width: 15, height: 15, scale: 1 }}
                        style={{ width: 15, height: 15 }}
                    />
                ))
                }
                <Pressable
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
                        name="arrow-circle-down-outline"
                        fill='#0058B7'
                        style={{ width: 30, height: 30 }}
                    />
                </Pressable>

            </MapView>
        </Layout>
    )
}