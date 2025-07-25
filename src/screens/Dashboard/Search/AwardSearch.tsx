import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import PrimaryGradientButton from '../../../components/GradientButton/PrimaryGradientButton';
import strings from '../../../global/strings';
import AwardCard from '../Card/AwardCard';
import {styles} from './Styles';

const AwardSearch = () => {
  function HandleRedeemCode() {
    return 'pressed redeem code';
  }

  return (
    <View>
      {/* <View style={styles.buttomWrapper}>
        <PrimaryGradientButton
          title={strings.redeemCode}
          style={styles.redeemCode}
          textStyle={styles.redeemTxt}
          textId={'redeemCodeButton'}
          titleId={'redeemCode'}
          onPress={HandleRedeemCode}
        />
      </View> */}
      <Text
        style={styles.titleWrapper}
        testID="publicBadges"
        accessibilityLabel="publicBadges">
        {strings.publicBadges}
      </Text>
    </View>
  );
};

export default AwardSearch;
