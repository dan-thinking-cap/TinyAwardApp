import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Svg, { Circle, G, Text } from 'react-native-svg';
import { Coordinates } from '../../context/GeolocationContext';

const NORTH_RADIUS = 10;
const SIZE = 200
const SPACING = 10
const RADIUS = (SIZE - SPACING * 2) / 2


const Minimap = ({ heading, badges, userLocation }: { heading: number, badges: { longitude: number, latitude: number, imageUrl: ImageSourcePropType }[], userLocation: Coordinates }) => {
    const mapRef = useRef<MapView | null>(null);
    const [mapReady, setMapReady] = useState(false);

    // Center once when the map is ready and we have a user fix
    useEffect(() => {
        if (!mapReady || !userLocation || !mapRef.current) return;
        mapRef.current.animateCamera(
            {
                center: { latitude: userLocation.latitude, longitude: userLocation.longitude },
                zoom: 18,
                heading: Number.isFinite(heading) ? heading : 0,
            },
            { duration: 400 }
        );
    }, [mapReady, userLocation?.latitude, userLocation?.longitude, heading]);

    // Throttle location updates a little to avoid jitter
    const lastUpdateRef = useRef(0);

    const onUserLocationChange = (e) => {
        if (!mapRef.current) return;
        const now = Date.now();
        if (now - lastUpdateRef.current < 250) return; // throttle 250ms

        const { latitude, longitude, heading: evtHeading } = e.nativeEvent.coordinate || {};
        if (typeof latitude !== 'number' || typeof longitude !== 'number') return;

        mapRef.current.animateCamera(
            {
                center: { latitude, longitude },
                zoom: 18,
                heading: Number.isFinite(evtHeading) ? evtHeading : 0,
            },
            { duration: 400 }
        );
        lastUpdateRef.current = now;
    };

    return (
        <View style={{ ...styles.container, transform: [{ rotate: `${-heading}deg` }] }}>
            <Svg height={SIZE} width={SIZE} style={{ zIndex: 2 }}>
                <G>
                    <Circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        stroke='white'
                        strokeWidth="2"
                        fill={'rgba(54, 0, 250, 0.1)'}
                    />
                    <Circle
                        cx={SIZE / 2}
                        cy={SPACING}
                        r={NORTH_RADIUS}
                        fill="white"
                    />
                    <Text
                        x={SIZE / 2}
                        y={11}
                        fontSize={NORTH_RADIUS}
                        fill="black"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        N
                    </Text>
                </G>
            </Svg>
            <View style={styles.mapWrapper}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFillObject}
                    showsUserLocation={true}                    // <-- required for onUserLocationChange
                    showsMyLocationButton={false}
                    showsBuildings={true}
                    rotateEnabled={false}
                    initialRegion={{
                        latitude: userLocation?.latitude ?? 37.33,
                        longitude: userLocation?.longitude ?? -122,
                        latitudeDelta: 0.0001,
                        longitudeDelta: 0.0001,
                    }}
                    onMapReady={() => setMapReady(true)}
                    onUserLocationChange={onUserLocationChange} // <-- follow via map's location feed
                >
                    {
                        badges.map((badge, i) => {
                            return <Marker
                                identifier="badgeLocation"
                                key={`badge-${i}`}
                                coordinate={{ latitude: badge.latitude, longitude: badge.longitude }}
                            >
                                <View style={styles.badgeIcon}>
                                    <View style={styles.badgeCircle}>
                                        <Image source={{ uri: badge.imageUrl }} style={{ width: 16, height: 16, resizeMode: 'contain', transform: [{ rotate: `${heading}deg` }] }} />
                                    </View>
                                </View>
                            </Marker>
                        })
                    }
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        zIndex: 10,
    },
    mapWrapper: {
        overflow: 'hidden',
        position: 'absolute',
        top: SPACING,
        width: RADIUS * 2, height: RADIUS * 2,
        borderRadius: SIZE,
        opacity: 0.75,
    },
    badgeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default Minimap

