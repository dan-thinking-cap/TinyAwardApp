import {StyleSheet} from 'react-native';
import {getScaledFont, height, width} from '../../../global/fonts';
import {fonts} from '../../../assets';
import colors from '../../../global/colors';

export const styles = StyleSheet.create({
  redeemCode: {
    width: width(116),
    height: height(38),
    borderRadius: getScaledFont(2),
  },
  buttomWrapper: {
    paddingHorizontal: width(12),
    paddingTop: height(24),
    paddingBottom: height(30),
  },
  redeemTxt: {
    fontSize: getScaledFont(15),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  titleWrapper: {
    paddingHorizontal: width(12),
    fontSize: getScaledFont(24),
    fontFamily: fonts.bold,
    color: colors.white,
    marginTop: height(10),
    paddingBottom: height(16),
  },
});
