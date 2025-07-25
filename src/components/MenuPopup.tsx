import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {Popover, usePopover} from 'react-native-modal-popover';
import {fonts} from '../assets';
import DownArrow from '../assets/icons/downArrow.svg';
import colors from '../global/colors';
import {getScaledFont, height, width} from '../global/fonts';
import strings from '../global/strings';
import storage from '../services/storage';
import {useAppDispatch} from '../store';
import {setUserData} from '../store/slice/user.slice';

const MenuPopup = ({type}: any) => {
  const {
    openPopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
    closePopover,
  } = usePopover();

  const dispatch = useAppDispatch();
  const handleLogoutPress = () => {
    closePopover();
    setTimeout(() => {
      LoginInType(type);
    }, 300);
  };

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

  // const logoutFromFaceBook = async () => {
  //   try {
  //     await AccessToken.setCurrentAccessToken(null);
  //     await LoginManager.logOut();
  //     storage.clearAll();
  //     dispatch(setUserData(null));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  return (
    <View>
      <StatusBar hidden={true} />
      <TouchableOpacity
        ref={touchableRef}
        onPress={openPopover}
        testID="popup"
        accessibilityLabel="popup">
        <DownArrow style={styles.arrowIcon} />
      </TouchableOpacity>
      <Popover
        contentStyle={styles.content}
        backgroundStyle={styles.background}
        visible={popoverVisible}
        onClose={closePopover}
        placement="bottom"
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}>
        <View>
          <Pressable
            onPress={handleLogoutPress}
            testID="loginButton"
            accessibilityLabel="loginButton">
            <Text
              style={styles.listTxt}
              testID="logoutTxt"
              accessibilityLabel="logoutTxt">
              {strings.logout}
            </Text>
          </Pressable>
        </View>
      </Popover>
    </View>
  );
};
const styles = StyleSheet.create({
  arrowIcon: {
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  background: {
    backgroundColor: colors.transparent,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: getScaledFont(8),
    height: 'auto',
    width: width(150),
  },
  listTxt: {
    color: colors.black,
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    marginStart: width(10),
    marginVertical: height(10),
    textAlign: 'left',
  },
});

export default MenuPopup;
