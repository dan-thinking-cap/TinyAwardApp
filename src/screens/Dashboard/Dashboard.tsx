import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Alert, Linking, SafeAreaView, StatusBar, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../global/colors';
import strings from '../../global/strings';
import storage, {storageKeys} from '../../services/storage';
import {useAppDispatch, useAppSelector} from '../../store';
import {setUserData, setUserID} from '../../store/slice/user.slice';
import {getUserIdByEmail, loginUser} from '../../store/thunk/dashbaord';
import {googleId} from '../Login/SocialLogin';
import AwardCard from './Card/AwardCard';
import HeaderModel from './Header/HeaderModel';
import AwardSearch from './Search/AwardSearch';
import {styles} from './styles';
import WebView from 'react-native-webview';
import { BASE_URL } from '../../services/constants';

const Dashboard = () => {
  const[url, seturl]  = useState(BASE_URL)
  const dispatch = useAppDispatch();
  const {userData, loginType} = useAppSelector(state => state.user);
  const {
    idToken,
    user: {email, familyName, givenName},
  } = userData?.data;

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    googleId();
  }, []);
  async function handleLogin() {
    const request = {
      OP: strings.Login,
      FirstName: familyName,
      LastName: givenName,
      Email: email,
      JWT: idToken,
      fromSite: false,
    };
    try {
      const {response, error} = await loginUser(request);
    } catch (error) {}
  }
  useEffect(() => {
    storage.set(storageKeys.signInData, userData);
    storage.set(storageKeys.loginType, loginType);
    fetchUserId();
  }, []);

  const logoutFromGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      storage.clearAll();
      dispatch(setUserData(null));
    } catch (error) {
      console.error(error);
    }
  };
  const logoutFromMicrosoft = async () => {
    try {
      storage.clearAll();
      dispatch(setUserData(null));
    } catch (error) {}
  };
  const LoginInType = (type: string) => {
    switch (type) {
      case strings.signInGoogle:
        logoutFromGoogle();
        break;
      case strings.loginWithFaceBook:
        // logoutFromFaceBook();
        break;
      case strings.signInMicroSoft:
        logoutFromMicrosoft();
        break;
      default:
        return logoutFromGoogle();
    }
  };
  async function fetchUserId() {
    try {
      let {response, error} = await getUserIdByEmail(email);
      if (response?.includes('"success":true"userid":')) {
        response = response?.replace(
          '"success":true"userid":',
          '"success":true,"userid":',
        );
      }
      try {
        const data = JSON?.parse(response);
        const userId = data?.userid;
        if (userId) {
          storage.set(storageKeys.userId, userId);
          dispatch(setUserID(userId));
        } else {
          Alert.alert(
            'An error occurred. Please try again.',
            '',
            [
              {
                text: 'ok',
                onPress: () => {
                  LoginInType(loginType);
                },
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    } catch (error) {}
  }
  useEffect(()=>{

  },[])
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <StatusBar hidden />
      <View style={styles.container}>
      <WebView
  source={{ uri:url }}
  allowUniversalAccessFromFileURLs={true}
  domStorageEnabled={true}
  javaScriptEnabled={true}
  mixedContentMode="always"
  originWhitelist={['*']}
  javaScriptCanOpenWindowsAutomatically={true}
  sharedCookiesEnabled={true}
  thirdPartyCookiesEnabled={true}
  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  // onShouldStartLoadWithRequest={(request) => {
  //     // Let WebView handle the rest
  // }}
  onMessage={(event) => {
    console.log('Message from WebView:', event.nativeEvent.data);
  }}
  onNavigationStateChange={(navState) => {
    seturl(navState.url)
    console.log('Navigated to:', navState.url);
  }}
/>
        {/* <HeaderModel />
        <LinearGradient
          colors={[colors.linerBlueGradientOne, colors.linerBlueGradientTwo]}
          style={styles.titleWrapper}>
          <Text
            style={styles.titleTxt}
            testID="welcomeLabel"
            accessibilityLabel="welcomeLabel">
            {strings.welcomeToTinyAward}
          </Text>
        </LinearGradient>
        <AwardSearch />
        <AwardCard /> */}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
