import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../assets';
import Info from '../../assets/icons/infoLogo.svg';
import colors from '../../global/colors';
import { getScaledFont, height, width } from '../../global/fonts';

const PrimaryGradientButton =
  ({
    title,
    style,
    textStyle,
    showIcon,
    onPress,
    disable,
    isBlue,
    textId,
    titleId,
  }: any) => {
    const gradientColor =
      disable && !isBlue
        ? [
          `${colors.linearYellowGradientOne}60`,
          `${colors.linearYellowGradientTwo}60`,
        ]
        : isBlue
          ? [colors.linerLightBlueGradientOne, colors.linerLightBlueGradientTwo]
          : [colors.linearYellowGradientOne, colors.linearYellowGradientTwo];

    return (
      <Pressable
        onPress={disable ? null : onPress}
        testID={textId}
        accessibilityLabel={textId}>
        <LinearGradient
          colors={gradientColor}
          style={[styles.buttonContainer, style]}>
          <View style={styles.iconWrapper}>
            {showIcon && (
              <Info
                style={styles.infoWrapper}
                height={height(25)}
                width={width(25)}
              />
            )}
            <Text
              style={[styles.buttonTxt, textStyle]}
              testID={titleId}
              accessibilityLabel={titleId}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  }


export default PrimaryGradientButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: width(124),
    height: height(53),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrapper: {
    marginEnd: width(5),
  },
  buttonTxt: {
    color: colors.white,
    fontSize: getScaledFont(48),
    fontFamily: fonts.bold,
  },
});
