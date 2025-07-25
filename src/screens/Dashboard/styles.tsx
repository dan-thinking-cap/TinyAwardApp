import {StyleSheet} from 'react-native';
import {getScaledFont, height, width} from '../../global/fonts';
import {fonts} from '../../assets';
import colors from '../../global/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  safeWrapper: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  logoutWrapper: {
    backgroundColor: colors.white,
    height: height(30),
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: height(68),
    zIndex: 1,
    right: 0,
  },
  logoutTxt: {
    fontSize: getScaledFont(24),
    fontFamily: fonts.bold,
    color: colors.black,
    textAlignVertical: 'center',
    marginHorizontal: width(20),
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.headerBlue,
    height: height(71),
    paddingHorizontal: width(12),
    paddingVertical: height(8),
  },
  logoWrapper: {
    height: height(45),
    width: width(125.3),
  },
  imageWrapper: {
    height: height(36),
    width: width(36),
  },
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  notificationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  countEnd: {
    marginEnd: width(14),
  },
  countText: {
    fontSize: getScaledFont(20),
    color: colors.white,
  },
  titleWrapper: {
    height: height(68),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: getScaledFont(24),
    fontFamily: fonts.bold,
    color: colors.white,
    marginHorizontal: width(12),
  },
});
