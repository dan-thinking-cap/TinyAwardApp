import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, AppState, TouchableOpacity, Text, Linking } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../services/constants';
import { fonts } from '../../assets';
import colors from '../../global/colors';

const WebLogin = ({ route }) => {
  const { isLogin } = route?.params || {}; 
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const [hasDeepLinked, setHasDeepLinked] = useState(false);

  // Check if deep linking is triggering another navigation
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log('Deep link detected:', url);
      setHasDeepLinked(true); // Prevent overriding deep link navigation
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, []);

  // Open the webpage when the screen is focused, but delay it to avoid conflicts
  useFocusEffect(
    useCallback(() => {
      if (!hasDeepLinked) {
        setTimeout(openWebPage, 500); // Delay to prevent overriding deep links
      }
    }, [hasDeepLinked])
  );

  // Open the webpage when the app resumes, but only if deep linking hasn't happened
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active' && !hasDeepLinked) {
        console.log('App resumed, opening URL...');
        setTimeout(openWebPage, 500); // Delay to prevent overriding deep link navigation
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, hasDeepLinked]);

  const openWebPage = () => {
    const url = isLogin
      ? `${BASE_URL}/Discover.aspx?loggedin=true`
      : `${BASE_URL}/Login.aspx#logInBox`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backGround }}>
      <TouchableOpacity onPress={openWebPage}>
        {/* <Text style={{ color: '#fff', fontFamily: fonts.bold, fontSize: 25 }}>
          Click to Continue
        </Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WebLogin;
