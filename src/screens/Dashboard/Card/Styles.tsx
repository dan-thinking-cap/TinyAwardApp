import {StyleSheet} from 'react-native';
import {getScaledFont, height, width} from '../../../global/fonts';
import {fonts} from '../../../assets';
import colors from '../../../global/colors';
import DeviceInfo from 'react-native-device-info';

export const isTab = DeviceInfo.isTablet();

export const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: width(13),
    backgroundColor: colors.darkBlue,
    borderRadius: getScaledFont(8),
    marginVertical: height(12),
    paddingHorizontal: width(16),
  },
  issueTxt: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  listContainerWrapper: {
    flexGrow: 1,
  },
  noBadges: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.medium,
    color: colors.white,
    paddingHorizontal: width(23),
    paddingVertical: height(30),
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(12),
  },
  listWrapper: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  issueName: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.bold,
    color: colors.yellow,
    // textDecorationStyle: 'solid',
    // textDecorationLine: 'underline',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(10),
  },
  titleTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.bold,
    color: colors.yellow,
    marginTop: height(9),
    marginBottom: height(7),
  },
  descriptionTxt: {
    fontSize: getScaledFont(16),
    fontFamily: fonts.regular,
    color: colors.white,
    marginBottom: height(18),
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height(16),
    gap: 10,
  },
  buttonWrapper: {
    height: height(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getScaledFont(6),
    width: width(183),
  },
  searchWrapper: {
    marginHorizontal: width(12),
    height: height(48),
    borderWidth: 1,
    borderColor: colors.searchItemGray,
    borderRadius: getScaledFont(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  searchIcon: {
    height: height(58),
    width: width(45),
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: getScaledFont(6),
    borderTopEndRadius: getScaledFont(6),
  },
  searchContainer: {
    height: height(58),
    flex: 1,
    paddingHorizontal: width(10),
    backgroundColor: colors.white,
    borderBottomStartRadius: getScaledFont(6),
    borderTopStartRadius: getScaledFont(6),
    color:'#000',
  },
  searchTxt: {
    fontSize: getScaledFont(16),
    color: colors.black,
    fontFamily: fonts.medium,
  },
  icon: {
    height: height(12),
    width: width(12),
  },
  imageLogo: {
    height: height(164),
    width: width(164),
    resizeMode: 'contain',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonTxt: {
    fontSize: getScaledFont(15),
    fontFamily: fonts.semiBold,
    color: colors.white,
    textAlign: 'center',
  },
});
