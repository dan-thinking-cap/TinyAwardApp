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
      // if (navigation.canGoBack()) {
      //   navigation.goBack(); // Navigate back if possible
      // } else {
      // Show exit confirmation
      // Alert.alert(
      //   'Exit App',
      //   'Do you want to exit?',
      //   [
      //     { text: 'Cancel', style: 'cancel' },
      //     { text: 'Exit', onPress: () => BackHandler.exitApp() }
      //   ]
      // );
      // }
      return true; // Prevent default back behavior
    };

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    };
  }, [navigation]);

  return null; // This component doesn't render anything
};

export default Navigation;

const styles = StyleSheet.create({
  sipnnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
