import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Alert,
  Linking,
} from 'react-native';
import {styles} from './Styles';
import Logo from '../../assets/icons/tinyAwardLogo.svg';
import strings from '../../global/strings';
import SignInButton from './SignInButton';
import {
  amazonOAuthUrl,
  linkedinOAuthUrl,
  loginWithAmazon,
  MicrosoftLogin,
  redirectUri,
  signInViaGoogle,
} from './SocialLogin';
import {useAppDispatch} from '../../store';
import Google from '../../assets/icons/google.svg';
import Facebook from '../../assets/icons/Facebook.svg';
import Amazon from '../../assets/icons/amazon-icon.svg';
import MicroSoft from '../../assets/icons/microsoft-5.svg';
import LinkenIn from '../../assets/icons/linkedin.svg';
import {height, width} from '../../global/fonts';
import useNavigation from '../../hooks/useNavigation';
import screenNames from '../../global/screenNames';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const handleUrl = event => {
      const {url} = event;
      if (url.startsWith(redirectUri)) {
        const token = url.match(/access_token=([^&]*)/);
        if (token) {
          console.log('Access token:', token[1]);
        } else {
          Alert.alert('Error', 'Token not found in URL.');
        }
      }
    };
    Linking.addEventListener('url', handleUrl);
    // return () => {
    //   Linking.removeEventListener('url', handleUrl);
    // };
  }, []);

  const openAmazonLogin = () => {
    Linking.openURL(amazonOAuthUrl).catch(err =>
      console.error('Failed to open Amazon Login', err),
    );
  };

  const openLinkedInLogin = () => {
    navigation.navigate(screenNames.webLogin, {url: amazonOAuthUrl});
  };

  return (
    <>
      <SafeAreaView style={styles.safeWrapper}>
        <StatusBar hidden />
        <View style={styles.container}>
          <View>
            <View
              style={styles.logoWrapper}
              testID="logo"
              accessibilityLabel="logo">
              <Logo />
            </View>
          </View>
          <View>
            <Text
              style={styles.pendingText}
              testID="copyRightDescription"
              accessibilityLabel="copyRightDescription">
              {strings.CopyrightPatentPending}
            </Text>
            <Text
              style={styles.privacyText}
              testID="privacyPolicy"
              accessibilityLabel="privacyPolicy">
              {strings.privacyPolicy}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <Text
          style={styles.titleTxt}
          testID="loginTxt"
          accessibilityLabel="loginTxt">
          {strings.login}
        </Text>
        <SignInButton
          title={strings?.signInGoogle}
          photo={<Google height={height(36)} width={width(36)} />}
          onPress={() =>
            process.env.JEST_WORKER_ID
              ? 'google Login initiate'
              : signInViaGoogle(dispatch)
          }
          btnTxt={'google'}
        />
        <SignInButton
          title={strings?.signInMicroSoft}
          btnTxt={'microsoft'}
          photo={<MicroSoft height={height(30)} width={width(30)} />}
          onPress={() =>
            process.env.JEST_WORKER_ID
              ? 'microsoft Login initiate'
              : MicrosoftLogin(dispatch)
          }
        />
        <SignInButton
          title={strings?.loginWithFaceBook}
          style={styles.faceBookBtn}
          btnTxt={'facebook'}
          photo={<Facebook height={height(36)} width={width(36)} />}
          txtStyle={styles.faceBookTxt}
          // onPress={() =>
          //   process.env.JEST_WORKER_ID
          //     ? 'FaceBook Login initiate'
          //     :
          // }
        />
        <SignInButton
          title={strings?.loginWithAmazon}
          btnTxt={'amazon'}
          photo={<Amazon height={height(30)} width={width(30)} />}
          style={styles.amazonBtn}
          onPress={() =>
            process.env.JEST_WORKER_ID
              ? 'MicroSoft Login initiate'
              : loginWithAmazon()
          }
        />
        <SignInButton
          title={strings?.signInWithLinkedIn}
          btnTxt={'linkedIn'}
          txtStyle={styles.faceBookTxt}
          photo={<LinkenIn />}
          style={styles.linkedInBtn}
          onPress={() =>
            process.env.JEST_WORKER_ID
              ? 'LinkedIn Login initiate'
              : openLinkedInLogin()
          }
        />
      </View>
    </>
  );
};

export default Login;
