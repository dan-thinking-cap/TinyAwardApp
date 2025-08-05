import {useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../../assets/icons/arrowForward.svg';
import Tiny from '../../../assets/icons/tinyAwardsLogoCollapsed.svg';
import PrimaryGradientButton from '../../../components/GradientButton/PrimaryGradientButton';
import colors from '../../../global/colors';
import screenNames from '../../../global/screenNames';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import {styles} from './Styles';
import {useAppSelector} from '../../../store';
import {updateBakeStatus} from '../../../store/thunk/dashbaord';
import {BASE_URL} from '../../../services/constants';
import LinkedIn from '../../../assets/icons/linkedin.svg';
import FaceBook from '../../../assets/icons/fb.svg';
import Twitter from '../../../assets/icons/twitter.svg';
import {getScaledFont, height, width} from '../../../global/fonts';
// import Sound from 'react-native-sound';

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, userID, badge} = (route.params as any) || {};
  const {userName} = useAppSelector(state => state.user);

  console.log('========', userName);
  useEffect(() => {
    handleBakeTask();
  }, []);

  async function handleBakeTask() {
    const request = {userID, badge};
    try {
      const {response, error} = await updateBakeStatus(request);
    } catch (error) {}
  }
  function goBackscreen() {
    navigation.push(screenNames.webLogin, {isLogin: true});
  }
  function handleBack() {
    // console.log("jjjjjjjj",`${BASE_URL}/Badges/MyBadges.aspx?badgeid=${badge}&tab_id=${123}`)
    Linking.openURL(`${BASE_URL}/Badges/MyBadges.aspx?badgeid=${badge}&tab_id=${123}`).catch(
      err => console.error('Failed to open Amazon Login', err),
    );
    //https://stable.tinyaward.com/Badges/MyBadges.aspx??badgeid=${badge}`
    // navigation.push(screenNames.dashboard, {"weburl":`${BASE_URL}/Badges/MyBadges.aspx??badgeid=${badge}`});
  }

  // const [sound, setSound] = useState(null);
  // useEffect(() => {
  //   Sound.setCategory('Playback'); // Important for iOS

  //   const newSound = new Sound('awarded.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       Alert.alert('Error', `Failed to load sound: ${error.message}`);
  //       console.log('Sound loading error:', error);
  //       return;
  //     }

  //     newSound.setVolume(1.0); // Set volume
  //     newSound.play((success) => {
  //       if (!success) {
  //         console.log('Playback failed');
  //       }
  //     });
  //     setSound(newSound);
  //   });

  //   return () => {
  //     if (newSound) {
  //       newSound.stop(() => {
  //         newSound.release();
  //       });
  //     }
  //   };

  // }, []);


  return (
    <SafeAreaView style={styles.safeWrapper}>
      <LinearGradient
        colors={[colors.linerBlueGradientOne, colors.linerBlueGradientTwo]}
        style={styles.container}>
          
        <View style={styles.topContainer}>
          <View>
            <View style={styles.headerWrapper}>
              <View style={styles.leftContainer}>
                <Tiny
                  style={styles.logoWrapper}
                  testID="logo"
                  accessibilityLabel="logo"
                />
                <Text
                  style={styles.headerText}
                  testID="userName"
                  accessibilityLabel="userName">
                  {`${strings.hi} ${userName}`}
                </Text>
              </View>
              {/* <View style={styles.rightWrappper}>
                <Pressable
                  onPress={goBackscreen}
                  testID="backArrow"
                  accessibilityLabel="backArrow">
                  <Arrow />
                </Pressable>
              </View> */}
            </View>
            <View style={styles.divider} />
            <Text
              style={styles.mainTitleTxt}
              testID="title"
              accessibilityLabel="title">
              {data?.BadgeName}
            </Text>
            <View style={styles.imageContainer}>

              <Image
                source={{uri: data?.Image}}
                style={styles.imageLogo}
                testID="awardLogo"
                accessibilityLabel="awardLogo"
              />
            </View>
            <View style={styles.detailContanier}>
              <Text
                style={styles.congTxt}
                testID="congratulationLabel"
                accessibilityLabel="congratulationLabel">
                {strings.congratulations}
              </Text>
              <Text
                style={styles.descriptionTxt}
                testID={'description'}
                accessibilityLabel={'description'}>
                {strings.youEarnedTinyAward}
              </Text>
              <Text
                style={styles.issueTxt}
                testID="issueTag"
                accessibilityLabel="issueTag">
                {strings.isssuedBy}
                <Text
                  style={styles.issueName}
                  testID={'issueByName'}
                  accessibilityLabel={'issueByName'}>
                  {data?.IssuerName}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <LottieView
              source={require('../../../components/lottiePlayer/fireCracker.json')}
              autoPlay
              loop
              style={{flex: 1}}
            />
            <View style={styles.detailBtnWrapper}>
              <PrimaryGradientButton
                title={strings.viewPortfolio}
                style={styles.detailBtn}
                textStyle={styles.detailsTxt}
                textId={'portfolio'}
                titleId={'portfolioTxt'}
                 onPress={handleBack}
              />
              <View style={styles.socialButton}>
                <Pressable
                  style={{
                    backgroundColor: '#fff',
                    height: getScaledFont(45),
                    width: getScaledFont(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `https://x.com/intent/post?text=Check+out+My+Recent+Badge&url=${encodeURIComponent(
                        `${BASE_URL}//ShareBadge.aspx?UserID=${userID}&BadgeID=${badge}`,
                      )}${encodeURIComponent('%')}`,
                    )
                  }>
                  <Twitter
                    height={getScaledFont(47)}
                    width={getScaledFont(47)}
                  />
                </Pressable>
                <Pressable
                  onPress={()=>{
                    
                    console.log("hhhhhhhhhhh",`${BASE_URL}/ShareBadge.aspx?UserID=${userID}BadgeID=${badge}&title=Check+out+My+Recent+Badge`)
                  let urlis =  encodeURIComponent(`${BASE_URL}//ShareBadge.aspx?UserID=${userID}&BadgeID=${badge}&title=Check+out+My+Recent+Badge`)
                  console.log("=========",`https://www.linkedin.com/shareArticle?mini=true&url=${urlis}`)
                    Linking.openURL(`https://www.linkedin.com/shareArticle?mini=true&url=${urlis}`)}}>
                  <LinkedIn
                    height={getScaledFont(60)}
                    width={getScaledFont(60)}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${BASE_URL}//ShareBadge.aspx?UserID=${userID}&BadgeID=${badge}`,
                      )}&title=Check+out+My+Recent+Badge+${encodeURIComponent(
                        '%',
                      )}`,
                    )
                  }>
                  <FaceBook
                    height={getScaledFont(45)}
                    width={getScaledFont(45)}
                  />
                </Pressable>
              </View>
              <Text style={styles.shareTxt}>
                {strings.shareYourAchievement}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Success;
