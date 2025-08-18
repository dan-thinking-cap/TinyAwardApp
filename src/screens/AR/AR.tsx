import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import UnityView from '@azesmway/react-native-unity/src/UnityView';
import { useGeolocation } from '../../hooks/useGeolocation';
import Spinner from '../../components/Spinner';
import useNavigation from '../../hooks/useNavigation';
import Minimap from '../../components/minimap/Minimap';
import screenNames from '../../global/screenNames';
import { useAppDispatch, useAppSelector } from '../../store';
import { setReadStatus } from '../../store/slice/user.slice';
import { updateTaskStatus } from '../../store/thunk/dashbaord';
import mapIcon from '../../assets/images/map-icon.png'
import BackIcon from '../../assets/icons/backArrow.svg'

const AR = () => {
    const route = useRoute();
    const dispatch = useAppDispatch()
    const navigation = useNavigation();
    const unityRef = useRef<UnityView>(null);
    const [keepViewMounted, setKeepViewMounted] = useState(false)
    // const [paused, setPaused] = useState(false)
    const { userID } = useAppSelector(state => state.user)
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
        const { lat: latitude, long: longitude } = destCoords
        setDestinationCoords({ latitude, longitude });
    }, [destCoords, setDestinationCoords]);


    const sendToUnity = (gameObject: string, method: string, payload: object) => {
        unityRef.current?.postMessage(gameObject, method, JSON.stringify(payload));
    };

    const handleUnityMessage = (evt) => {
        const message = evt.nativeEvent.message
        console.log('Unity → RN: ', message);
        if (message === "Badge Completed") {
            handleCompletedTask({ userID, task, type, badge })
            // unityRef.current?.unloadUnity()
        }
    }

    async function handleCompletedTask({ userID, task, type, badge }: any) {
        const request = { userID, task, type, badge };
        try {
            const { response, error } = await updateTaskStatus(request);
            console.log(response, error)
            if (response?.success) {
                dispatch(setReadStatus(true));
                if (isQuiz) {
                    navigation.push(screenNames.awardDetails, { data: givenData });
                } else {
                    navigation.push(screenNames.success, {
                        data: badgeData,
                        userID,
                        badge,
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBack = () => {
        // if (paused){
        //     unityRef.current?.pauseUnity(true)
        // } else {
        //     unityRef.current?.resumeUnity()
        // }
        // setPaused(prev => !prev)
        // // unityRef.current?.unloadUnity()
        // setKeepViewMounted(false)
        //Combine this with useFocusEffect to make the screen pause and unpause when it isn't in view
        navigation.goBack()
    }

    useEffect(() => {
        sendToUnity('Canvas', 'OnMessage', { distance: Number(distance.toFixed(2)), inRange, userLocation: coords, destination: destinationCoords, heading })
        sendToUnity('XR Origin', 'OnMessage', { distance: Number(distance.toFixed(2)), inRange, userLocation: coords, destination: destinationCoords, heading })
    }, [distance, inRange, coords, destinationCoords, heading]);

    useEffect(() => {
        if (ready && badgeData) {
            if (!keepViewMounted) setKeepViewMounted(true)
            sendToUnity('XR Origin', 'OnReceiveBadgeData', { name: badgeData?.BadgeName, imageUrl: badgeData?.Image, hasQuiz: isQuiz })
        }
    }, [ready, badgeData])



    return (
        <View style={styles.container}>
            {ready ?
                <>
                    <UnityView
                        ref={unityRef}
                        style={StyleSheet.absoluteFill}
                        onUnityMessage={evt => handleUnityMessage(evt)}
                        androidKeepPlayerMounted={keepViewMounted}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.button}
                            onPress={handleBack} //Go to Map screen if not opened, and if it is opened then open that screen
                        >
                            <BackIcon width={22} height={22} />
                        </Pressable>
                        <Minimap heading={heading} badges={[{ ...destinationCoords, imageUrl: badgeData?.Image }]} />
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.push(screenNames.map, { badge, type, task, isQuiz, badgeData, taskData, givenData, destinationCoords })} //Go to Map screen if not opened, and if it is opened then open that screen
                        >
                            <Image source={mapIcon}
                                style={{
                                    width: 24,
                                    height: 24,
                                    resizeMode: 'contain',
                                    tintColor: 'white', // makes black PNG render as white
                                }}
                            />
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
    container: { flex: 1 },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    button: {
        backgroundColor: 'rgba(30, 0, 255, 0.75)',
        borderColor: 'white',
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
        bottom: 10, //Keep the same as the spacing for the minimap
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default AR
