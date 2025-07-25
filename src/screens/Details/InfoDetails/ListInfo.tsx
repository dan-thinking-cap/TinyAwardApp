import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getScaledFont, height, width} from '../../../global/fonts';
import {fonts} from '../../../assets';
import colors from '../../../global/colors';

const ListInfo = ({title, titleId, value, valueId}) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.titleText}
        testID={titleId}
        accessibilityLabel={titleId}>
        {title}
      </Text>
      <Text
        style={[styles.titleText, styles.right]}
        testID={valueId}
        accessibilityLabel={valueId}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: getScaledFont(20),
    fontFamily: fonts.medium,
    color: colors.white,
    marginTop: height(16),
    width: '30%',
  },
  right: {
    width: '70%',
    alignItems: 'flex-start',
  },
});

export default ListInfo;
