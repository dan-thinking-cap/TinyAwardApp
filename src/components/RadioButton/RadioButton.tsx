import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {getScaledFont, height, width} from '../../global/fonts';
import colors from '../../global/colors';
import Unselected from '../../assets/icons/radioOutline.svg';
import Selected from '../../assets/icons/radioSelected.svg';
import {fonts} from '../../assets';

const RadioButton = ({
  option,
  setStatus,
  status,
  id,
  setOption,
  questionId,
  code,
}: any) => {
  let answer = {
    questionId: questionId,
    answerId: id,
    isCorrect: code,
  };
  function handlePress() {
    setStatus(id);
    setOption(answer);
  }
  return (
    <Pressable
      style={styles.boxWrapper}
      testID="option"
      accessibilityLabel="option"
      key={id}
      onPress={handlePress}>
      <View style={styles.innerWrapper}>
        <View>{status ? <Selected /> : <Unselected />}</View>
        <Text
          style={styles.optionTxt}
          testID="optionTxt"
          accessibilityLabel="OptionTxt">
          {option}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  },
});
export default RadioButton;
