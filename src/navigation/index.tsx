import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, BackHandler, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import GuestStack from './GuestStack';
import UserStack from './UserStack';
import { setUserData } from '../store/slice/user.slice';
import { App } from '../App';
import useNavigation from '../hooks/useNavigation';

function Navigation() {
  const { userData } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch()
  const loginToken = userData?.data?.idToken;
  const linking = {
    prefixes: ['tinyaward://'],
    config: {
      screens: {
        AwardDetails: {
          path: 'app-screen',
          parse: {
            screen: screen => screen,
            data: data =>
              JSON.parse(data || '{}'),
          },
        }
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <GlobalBackHandler />
      {/* {loginToken ? <UserStack /> : <GuestStack />} */}
      <UserStack />
    </NavigationContainer>
  );
}

const GlobalBackHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const onBackPress = () => {
      // Replace this with your actual back handler logic
      return true; // Prevent default back behavior
    };

    let backHandlerListener: any;
    if (Platform.OS === 'android') {
      backHandlerListener = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }

    return () => {
      // Properly remove listener using .remove() on the subscription
      if (Platform.OS === 'android') {
        backHandlerListener?.remove();
      }
    };
  }, [navigation]);

  return null;
};

export default Navigation;

const styles = StyleSheet.create({
  sipnnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
