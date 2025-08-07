import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Svg, { Circle, G, Text } from 'react-native-svg';
import { Camera, MapView, MarkerView, PointAnnotation, StyleURL, UserTrackingMode } from '@maplibre/maplibre-react-native';

const NORTH_RADIUS = 10;
const SIZE = 200
const SPACING = 10
const RADIUS = (SIZE - SPACING * 2) / 2


const Minimap = ({ heading, badges }: { heading: number, badges: { longitude: number, latitude: number, imageUrl: ImageSourcePropType }[] }) => {
    return (
        <View style={{ ...styles.container, transform: [{ rotate: `${-heading}deg` }] }}>
            <Svg height={SIZE} width={SIZE} style={{ zIndex: 2 }}>
                <G>
                    <Circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        stroke="white"
                        strokeWidth="2"
                        fill={'rgba(54, 0, 250, 0.4)'}
                    />
                    <Circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r="4"
                        fill="white"
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
                    style={{ flex: 1 }}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=N6mj8EP8JsWcGpACRdsb"
                >
                    <Camera
                        followUserLocation={true}
                        followUserMode={UserTrackingMode.Follow}
                        followZoomLevel={17}
                    />
                    {
                        badges.map(badge => {
                            return <MarkerView id='location' coordinate={[badge.longitude, badge.latitude]}>
                                <View style={styles.badgeIcon}>
                                    <View style={styles.badgeCircle}>
                                        <Image source={{ uri: badge.imageUrl }} style={{ width: 16, height: 16, resizeMode: 'contain', transform: [{ rotate: `${heading}deg` }] }} />
                                    </View>
                                </View>
                            </MarkerView>
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