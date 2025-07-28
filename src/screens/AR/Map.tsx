import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, Image } from 'react-native';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Camera, CameraRef, MapView, MarkerView, PointAnnotation, StyleURL, UserTrackingMode } from '@maplibre/maplibre-react-native';
import useNavigation from '../../hooks/useNavigation';

const Map = () => {
    const route = useRoute();
    const navigation = useNavigation()
    const { coords, distance: dist, inRange, destinationCoords: destination, heading } = useGeolocation()
    const { badge, type, task, isQuiz, badgeData, taskData, givenData, destinationCoords: destCoords } =
        (route?.params as any) || {};
    const image = badgeData?.Image
    const cameraRef = useRef<CameraRef>(null);
    const [hasCentered, setHasCentered] = useState(false);


    useEffect(() => {
        if (coords && cameraRef.current && !hasCentered) {
            cameraRef.current.setCamera({
                centerCoordinate: [coords.longitude, coords.latitude],
                zoomLevel: 18,
                animationMode: 'flyTo',
                animationDuration: 1000,
            });
            setHasCentered(true);
        }
    }, [coords]);

    console.log(image)


    return (
        <View style={{ flex: 1 }}>
            {coords ? (
                <MapView
                    style={{ flex: 1 }}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=N6mj8EP8JsWcGpACRdsb"
                >
                    {!hasCentered && <Camera
                        ref={cameraRef}
                        maxZoomLevel={19}
                    />}
                    <MarkerView coordinate={[coords.longitude, coords.latitude]}>
                        <View style={styles.markerContainer}>
                            <View style={styles.userCircle}>
                                <Text style={styles.markerText}>👤</Text>
                            </View>
                        </View>
                    </MarkerView>
                    {destination &&
                        <MarkerView id='location' coordinate={[destination.longitude, destination.latitude]}>
                            <View style={styles.badgeIcon}>
                                <View style={styles.badgeCircle}>
                                    <Image source={{uri: image}} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                                </View>
                            </View>
                        </MarkerView>
                    }
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading your location…</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                {/* <Text>Distance: {dist?.toFixed(2)} m</Text>
                <Text>In Range? {inRange?.toString()}</Text>
                <Text>Heading: {heading ?? 0}</Text> */}
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Back to AR View</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    badgeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black'
    },
    markerContainer: {
        justifyContent: 'center', alignItems: 'center'
    },
    markerText: {
        top: -2
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: 'rgba(30, 0, 255, 0.6)',
        borderColor: 'white',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 50,
        zIndex: 30.
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    badgeCircle: {
        width: 24, // adjust as needed
        height: 24,
        borderRadius: 24, // half of width/height
        backgroundColor: 'rgba(30, 0, 255, 0.85)', // or 'rgba(255,255,255,0.8)' for transparency
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3, // Android shadow
    },
    userCircle: {
        width: 24, // adjust as needed
        height: 24,
        borderRadius: 24, // half of width/height
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // or 'rgba(255,255,255,0.8)' for transparency
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3, // Android shadow
    },
});