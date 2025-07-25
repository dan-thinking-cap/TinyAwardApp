import { StyleSheet } from 'react-native';
import { getScaledFont, height, width } from '../../../global/fonts';
import { fonts } from '../../../assets';
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
    justifyContent: 'space-between',
  },
  failedHeader: {
    fontSize: getScaledFont(32),
    fontFamily: fonts.bold,
    color: colors.white,
    marginTop: height(20),
  },
  failedDescription: {
    fontSize: getScaledFont(18),
    fontFamily: fonts.medium,
    color: colors.white,
    marginTop: height(4),
  },
  failWrapper: {
    marginHorizontal: width(20),
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: height(61),
    marginHorizontal: width(32),
    marginTop: height(16),
    marginBottom: height(16),
  },
  middleWrapper: {
    marginHorizontal: width(20),
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
  mainTitleTxt: {
    fontSize: getScaledFont(32),
    fontFamily: fonts.bold,
    color: colors.disabledFontColor,
    textAlign: 'left',
    marginTop: height(24),
    marginBottom: height(16),
  },
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.white,
  },
  titleTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginBottom: height(16),
  },
  submitBtnWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: height(28),
  },
  descriptionTxt: {
    fontSize: getScaledFont(28),
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginTop: height(16),
  },
  submitBtn: {
    width: width(124),
    height: height(53),
    borderRadius: getScaledFont(8),
  },
  scrollwrapper: {
    flexGrow: 1,
    paddingBottom: '50%',
  },
  submitTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  boxWrapper: {
    borderColor: colors.white,
    borderWidth: getScaledFont(1),
    justifyContent: 'center',
    paddingHorizontal: width(16),
    borderRadius: getScaledFont(4),
    marginTop: height(20),
    paddingVertical: height(26),
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  optionTxt: {
    fontSize: getScaledFont(18),
    fontFamily: fonts.medium,
    color: colors.white,
    width: '90%',
    paddingRight: width(10),
  },
  feedbackCorrect: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
  },
  feedbackIncorrect: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
  },
});
