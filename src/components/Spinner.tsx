import React from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';
import {CircleSnail} from 'react-native-progress';
import colors from '../global/colors';
import {getScaledFont, height} from '../global/fonts';
import {useAppSelector} from '../store';

function Spinner() {
  const {spinners} = useAppSelector(state => state.user);

  if (spinners < 1) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.middleWrapper} />
      <CircleSnail
        size={49}
        thickness={1}
        direction={I18nManager.isRTL ? 'counter-clockwise' : 'clockwise'}
        color={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  middleWrapper: {
    height: height(150),
    aspectRatio: 1,
    borderRadius: getScaledFont(8),
    backgroundColor: colors.darkBlue,
    position: 'absolute',
  },
  lottie: {
    flex: 1,
  },
});

export default Spinner;
