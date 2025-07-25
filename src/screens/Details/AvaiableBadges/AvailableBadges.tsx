import {useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../../assets/icons/arrowForward.svg';
import Tiny from '../../../assets/icons/tinyAwardsLogoCollapsed.svg';
import colors from '../../../global/colors';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import {useAppDispatch, useAppSelector} from '../../../store';
import screenNames from '../../../global/screenNames';
import useSpinners from '../../../hooks/useSpinners';
import {getALLBadges} from '../../../store/thunk/dashbaord';
import {styles} from './Styles';
const AvailableBagdes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData} = useAppSelector(state => state.user);
  const {
    idToken,
    user: {email, familyName, givenName},
  } = userData?.data;

  const {data, screen} = (route.params as any) || {};
  const [itemData, setItemData] = useState<any>([]);
  const {addOneSpinner, removeOneSpinner} = useSpinners();
  const dispatch = useAppDispatch();

  function handleBack() {
    navigation.goBack();
  }
  useLayoutEffect(() => {
    handleAvailableBades();
  }, []);

  async function handleAvailableBades() {
    addOneSpinner();
    let trimValued = data?.Url?.replace('https://', '');
    const hostID = trimValued?.slice(0, trimValued?.indexOf('/'));
    const request = {
      host: hostID,
      email: email,
    };
    try {
      const {response, error} = await getALLBadges(request);
      removeOneSpinner();
      setItemData(response);
    } catch (error) {
      removeOneSpinner();
    }
  }

  const renderItem = ({item}) => {
    const handleGo = () => {
      navigation.navigate(screenNames.awardDetails, {data: item});
    };
    return (
      <View style={styles.listWrapper}>
        <View style={styles.leftWrapper}>
          <Image source={{uri: item?.Image}} style={styles.imageWrapper} />
          <Text style={styles.descriptionTxt} numberOfLines={2}>
            {item?.BadgeName}
          </Text>
        </View>
        <Pressable style={styles.bottomButton} onPress={handleGo}>
          <Text style={styles.detailsTxt}>{strings.go}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <StatusBar hidden />
      <LinearGradient
        colors={[colors.linerBlueGradientOne, colors.linerBlueGradientTwo]}
        style={styles.container}>
        <View>
          <View style={styles.headerWrapper}>
            <View style={styles.leftContainer}>
              <View testID="tinyLogo" accessibilityLabel="TinyLogo">
                <Tiny style={styles.logoWrapper} />
              </View>
              <Text
                style={styles.headerText}
                testID="userName"
                accessibilityLabel="userName">
                {`${strings.hi} ${givenName}`}
              </Text>
            </View>
            <View style={styles.rightWrappper}>
              <Pressable
                onPress={handleBack}
                testID="backArrow"
                accessibilityLabel="backArrow">
                <Arrow />
              </Pressable>
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <FlatList
              data={itemData?.Badges}
              renderItem={renderItem}
              bounces={false}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text
            style={styles.pendingText}
            testID="copyRightDescription"
            accessibilityLabel="copyRightDescription">
            {strings.CopyrightPatentPending}
          </Text>
          <Text
            style={styles.privacyText}
            testID="privacyPolicy"
            accessibilityLabel="privacyPolicy">
            {strings.privacyPolicy}
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AvailableBagdes;
