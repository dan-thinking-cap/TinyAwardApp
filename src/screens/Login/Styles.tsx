import {StyleSheet} from 'react-native';
import {getScaledFont, height, width} from '../../global/fonts';
import {fonts} from '../../assets';
import colors from '../../global/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backGround,
  },
  safeWrapper: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  pendingText: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    color: colors.darkYellow,
    textAlign: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(40),
  },
  middleWrapper: {
    height: height(150),
    aspectRatio: 1,
    borderRadius: getScaledFont(8),
    backgroundColor: colors.darkBlue,
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loader: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backGround,
  },
  titleTxt: {
    fontSize: getScaledFont(40),
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
    marginBottom: height(50),
  },
  privacyText: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    color: colors.darkYellow,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: colors.darkYellow,
    marginBottom: height(10),
  },
  buttonWrapper: {
    height: height(60),
    borderRadius: getScaledFont(8),
    borderWidth: getScaledFont(1),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: getScaledFont(15),
    backgroundColor: colors.white,
    marginBottom: height(16),
    paddingHorizontal: width(50),
    width: '100%',
  },
  btnTxt: {
    fontSize: getScaledFont(22),
    fontFamily: fonts.medium,
    color: colors.black,
    textAlign: 'center',
  },
  faceBookBtn: {
    backgroundColor: colors.blue,
  },
  faceBookTxt: {
    color: colors.white,
  },
  amazonBtn: {
    backgroundColor: colors.darkYellow,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  linkedInBtn: {
    backgroundColor: colors.linkedIn,
  },
});
