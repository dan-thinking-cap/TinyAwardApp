import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './Styles';

const SignInButton = ({
  style,
  title,
  onPress,
  txtStyle,
  photo,
  btnTxt,
}: any) => {
  return (
    <Pressable
      style={[styles.buttonWrapper, style]}
      onPress={onPress}
      testID={btnTxt}
      accessibilityLabel={btnTxt}>
      <View testID={`${btnTxt} Icon`} accessibilityLabel={`${btnTxt} Icon`}>
        {photo}
      </View>
      <Text
        style={[styles.btnTxt, txtStyle]}
        testID={title}
        accessibilityLabel={title}>
        {title}
      </Text>
    </Pressable>
  );
};

export default SignInButton;
