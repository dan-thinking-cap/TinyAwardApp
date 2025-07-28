import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import UnityView from '@azesmway/react-native-unity/src/UnityView';
import { useGeolocation } from '../../hooks/useGeolocation';
import Spinner from '../../components/Spinner';
import useNavigation from '../../hooks/useNavigation';
import Minimap from '../../components/minimap/Minimap';
import screenNames from '../../global/screenNames';

const WORK_LOCATION = {
    latitude: 43.650092,
    longitude: -79.364404,
};

const AR = () => {
    const route = useRoute();
    const unityRef = useRef<UnityView>(null);
    const navigation = useNavigation();
    const { badge, type, task, isQuiz, badgeData, taskData, givenData, destinationCoords: destCoords } =
        (route?.params as any) || {};
    const {
        coords,
        distance,
        inRange,
        destinationCoords,
        heading,
        setDestinationCoords,
        ready,
    } = useGeolocation();
    useEffect(() => {
        // const { lat: latitude, long: longitude } = destCoords
        const { latitude, longitude } = WORK_LOCATION
        setDestinationCoords({ latitude, longitude });
    }, [destCoords, setDestinationCoords]);


    const sendToUnity = (gameObject: string, method: string, payload: object) => {
        unityRef.current?.postMessage(gameObject, method, JSON.stringify(payload));
    };



    useEffect(() => {
        sendToUnity('Canvas', 'OnMessage', { distance: Number(distance.toFixed(2)), inRange, userLocation: coords, destination: destinationCoords, heading })
        sendToUnity('XR Origin', 'OnMessage', { distance: Number(distance.toFixed(2)), inRange, userLocation: coords, destination: destinationCoords, heading })
    }, [distance, inRange, coords, destinationCoords, heading]);


    // console.log(badge, type, task, isQuiz, badgeData, taskData, givenData, destCoords)
    console.log(coords, WORK_LOCATION)

    return (
        <View style={styles.container}>
            {ready ?
                <>
                    <UnityView
                        ref={unityRef}
                        style={StyleSheet.absoluteFill}
                        onUnityMessage={evt => {
                            console.log('Unity → RN:', evt.nativeEvent.message);
                        }}
                    // androidKeepPlayerMounted={true}
                    />
                    <Minimap heading={heading} badges={[{ ...destinationCoords, imageUrl: badgeData?.Image }]} />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.push(screenNames.map, { badge, type, task, isQuiz, badgeData, taskData, givenData })} //Go to Map screen if not opened, and if it is opened then open that screen
                        >
                            <Text style={styles.buttonText}>Open Map</Text>
                        </Pressable>
                    </View>
                </>
                :
                <Spinner />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
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
        fontWeight: 'bold',
    },
});


export default AR
