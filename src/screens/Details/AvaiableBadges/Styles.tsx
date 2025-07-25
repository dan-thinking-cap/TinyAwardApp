import {StyleSheet} from 'react-native';
import {getScaledFont, height, width} from '../../../global/fonts';
import {fonts} from '../../../assets';
import colors from '../../../global/colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  safeWrapper: {
    flex: 1,
    backgroundColor: colors.linerBlueGradientOne,
  },
  topContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    height: '84%',
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: width(20),
    marginHorizontal: width(30),
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: height(100),
    paddingHorizontal: width(16),
    paddingTop: height(16),
    marginBottom: height(16),
    backgroundColor: colors.darkBlue,
  },
  buttonContainer: {
    width: width(400),
    height: height(120),
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
  },
  rightWrappper: {
    alignItems: 'flex-end',
    width: '50%',
    height: height(61),
  },
  readTxt: {
    fontSize: getScaledFont(30),
    color: colors.white,
    fontFamily: fonts.bold,
  },
  headerText: {
    fontSize: getScaledFont(18),
    fontFamily: fonts.medium,
    color: colors.white,
    marginStart: width(10),
  },
  logoWrapper: {
    height: height(61),
    width: width(45),
  },
  imageWrapper: {
    height: height(60),
    width: width(60),
    resizeMode: 'contain',
  },
  imageContainer: {
    marginTop: height(16),
    marginBottom: height(40),
    alignItems: 'center',
  },
  buttonTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: '50%',
  },
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonWrapper: {
    marginHorizontal: width(15),
  },
  mainTitleTxt: {
    fontSize: getScaledFont(32),
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    marginTop: height(24),
    marginBottom: height(32),
  },
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.white,
  },
  pendingText: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    color: colors.darkYellow,
    textAlign: 'center',
  },
  privacyText: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    color: colors.darkYellow,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: colors.darkYellow,
    marginBottom: height(3),
  },
  titleTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginBottom: height(16),
  },
  detailContanier: {
    marginStart: width(24),
  },
  detailBtnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(48),
    marginBottom: height(18),
  },
  descriptionTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.white,
  },
  detailsWrapper: {
    marginTop: height(48),
    marginBottom: height(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBtn: {
    width: width(124),
    height: height(53),
    borderRadius: getScaledFont(8),
  },
  issueTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    fontStyle: 'italic',
    color: colors.white,
  },
  issueName: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    color: colors.white,
    fontStyle: 'italic',
  },
  detailsTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  topButton: {
    height: height(65),
    width: '100%',
    borderTopStartRadius: getScaledFont(8),
    borderTopEndRadius: getScaledFont(8),
    backgroundColor: colors.lightBtnBlue,
    justifyContent: 'center',
    paddingHorizontal: width(24),
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.btnBorderColor,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomButton: {
    height: height(60),
    width: width(60),
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getScaledFont(8),
  },
  arrowWrapper: {
    position: 'absolute',
    marginStart: width(20),
    zIndex: 1,
    top: -3,
  },
  bottomButtonAlign: {
    height: height(65),
    justifyContent: 'center',
  },
});
