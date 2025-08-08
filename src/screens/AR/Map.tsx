import { useRoute } from '@react-navigation/native';
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, Image, InteractionManager } from 'react-native';
import { useGeolocation } from '../../hooks/useGeolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useNavigation from '../../hooks/useNavigation';
import CameraSvg from '../../assets/icons/camera.svg';

const Map = () => {
    const mapRef = useRef<MapView | null>(null);
    const route = useRoute();
    const navigation = useNavigation()
    const { coords: userLocation } = useGeolocation()
    const { badge, type, task, isQuiz, badgeData, taskData, givenData, destinationCoords: destCoords } =
        (route?.params as any) || {};
    const { Image: image, BadgeName: name } = badgeData || {}
    const [tracks, setTracks] = useState(true);

    console.log(destCoords)

    const onImgLoad = useCallback(() => {
        // stop re-rendering the marker once the image has drawn
        requestAnimationFrame(() => setTracks(false));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {userLocation ? (
                <MapView
                    ref={mapRef}
                    key={"map"}
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.001, //How much the it zooms in
                        longitudeDelta: 0.001, //How much the it zooms in
                    }}
                    showsCompass={true}
                    showsUserLocation={true}
                >
                    {destCoords && <Marker
                        identifier="badgeLocation"
                        coordinate={destCoords}
                    >
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeLabel}>{name}</Text>
                            <View style={styles.badgeCircle}>
                                <Image source={{ uri: image }} onLoad={onImgLoad} style={styles.badgeIcon} />
                            </View>
                            {/* Make callouts/tool tips later */}
                        </View>
                    </Marker>}
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading your location…</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <CameraSvg width={22} height={22} fill="#fff" />
                </Pressable>
            </View>
        </View>
    );
}

export default Map

const styles = StyleSheet.create({
    markerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: 'rgba(30, 0, 255, 0.85)',
        borderColor: 'white',
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
        zIndex: 30.
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    badgeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeCircle: {
        width: 36, // adjust as needed
        height: 36,
        borderRadius: 36, // half of width/height
        backgroundColor: 'rgba(30, 0, 255, 0.85)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 3, // Android shadow
    },
    badgeIcon: {
        width: 24, height: 24, resizeMode: 'contain'
    },
    badgeLabel: {
        marginTop: 2,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 12,
        textAlign: 'center',
        flexWrap: 'wrap',
        maxWidth: 100,  // ⬅ sets wrapping limit
        overflow: 'hidden',
        marginBottom: 10,
    },
    callout: {
        minWidth: 140,
    },
    calloutTitle: { fontWeight: '600', marginBottom: 4 },
    calloutSubtitle: { color: '#555' },
});
