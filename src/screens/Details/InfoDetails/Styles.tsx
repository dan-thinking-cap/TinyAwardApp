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
  containerAlignment: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: height(20),
  },
  cirleAlignment: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  topContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    height: '90%',
    marginBottom: height(30),
  },
  alignmentText: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.textWhite,
    flex: 1,
  },
  subTitle: {
    marginVertical: height(4),
  },
  mainTitle: {
    fontFamily: fonts.bold,
  },
  scrollWrapper: {
    marginHorizontal: width(20),
    marginBottom: height(40),
  },
  circle: {
    height: getScaledFont(10),
    width: getScaledFont(10),
    borderRadius: getScaledFont(5),
    backgroundColor: colors.textWhite,
    borderWidth: getScaledFont(1),
    marginHorizontal: width(10),
    marginVertical: height(6),
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: height(61),
    paddingHorizontal: width(32),
    marginTop: height(16),
    backgroundColor: colors.darkBlue,
  },
  titleText: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.white,
    width: '30%',
  },
  right: {
    width: '70%',
    alignItems: 'flex-start',
  },
  issueTagWrapper: {
    width: '30%',
  },
  listWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    columnGap: 5,
    rowGap: 5,
    marginTop: height(20),
  },
  issuerWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '70%',
  },

  tagWrapper: {
    paddingHorizontal: width(10),
    paddingVertical: height(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height(50),
    borderWidth: getScaledFont(1),
    backgroundColor: colors.tagColor,
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
    justifyContent: 'center',
    height: height(61),
  },
  tagTxt: {
    fontSize: getScaledFont(18),
    color: colors.textWhite,
    fontFamily: fonts.bold,
    textTransform: 'capitalize',
  },
  headerText: {
    fontSize: getScaledFont(28),
    fontFamily: fonts.medium,
    color: colors.textWhite,
    marginStart: width(10),
  },
  imageWrapper: {
    height: height(200),
    width: width(200),
    resizeMode: 'contain',
  },
  profileWrapper: {
    height: height(40),
    width: width(40),
    resizeMode: 'contain',
    marginEnd: width(10),
  },
  imageContainer: {
    marginTop: height(16),
    marginBottom: height(40),
    alignItems: 'flex-start',
  },
  mainTitleTxt: {
    fontSize: getScaledFont(32),
    fontFamily: fonts.bold,
    color: colors.textWhite,
    textAlign: 'left',
    marginTop: height(12),
  },
  detailContanier: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: height(20),
  },
  descriptionTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.textWhite,
    marginTop: height(16),
  },
  expries: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.textWhite,
    marginTop: height(16),
  },
  criteria: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.textWhite,
    marginTop: height(16),
    marginHorizontal: width(14),
  },
  issueTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    fontStyle: 'italic',
    color: colors.textWhite,
  },
  issueName: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.semiBold,
    color: colors.textWhite,
    fontStyle: 'italic',
  },
  detailsTxt: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.bold,
    color: colors.textWhite,
  },
  bottomButton: {
    height: height(60),
    width: width(60),
    marginTop: height(20),
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getScaledFont(8),
  },
});
