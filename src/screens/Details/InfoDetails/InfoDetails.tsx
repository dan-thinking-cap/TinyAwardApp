import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../../assets/icons/arrowForward.svg';
import colors from '../../../global/colors';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import { getInfoData } from '../../../store/thunk/dashbaord';
import ListInfo from './ListInfo';
import { styles } from './Styles';
import screenNames from '../../../global/screenNames';
export const IMAGE_BASE_jpg = 'https://tinyaward.b-cdn.net/users/';
export const IMAGE_BASE_png = 'https://tinyaward.b-cdn.net/issuers/';
const InfoDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = (route.params as any) || {};
  const [badgeData, setBadgeData] = useState<any>([]);
  const [tags, setTags] = useState<any>();
  function handleHtmlTxt(html: any) {
    return html
      ?.replace(/<\/?[^>]+(>|$)/g, '')
      ?.replace(/&nbsp;/g, ' ')
      ?.trim();
  }
  function handleBack() {
    navigation.goBack();
  }
  useFocusEffect(
    useCallback(() => {
      handleFetchDetails();
    }, []),
  );
  async function handleFetchDetails() {
    try {
      const { response, error } = await getInfoData(data?.OpenBadgeID);
      setBadgeData(response?.Badge?.[0]);
      const tagsArray = response?.Badge?.[0]?.Tags?.split(',');
      if (response?.Badge?.[0]?.Tags) {
        setTags(tagsArray);
      }
    } catch (error) { }
  }
  function cleanData(input: any) {
    try {
      let cleanedInput = input?.replace(/\\r\\n/g, '')?.replace(/\\/g, '');
      let jsonData = JSON?.parse(cleanedInput);
      return jsonData;
    } catch (error) {
      return null;
    }
  }

  function extractCompetencyTitles(data) {
    const result = [];
    data?.forEach(item => {
      let existing = result?.find(
        entry => entry?.title === item?.CompetencyTitle,
      );

      if (existing) {
        existing?.options?.push(item?.Title);
      } else {
        result.push({
          title: item?.CompetencyTitle,
          options: [item?.Title],
        });
      }
    });
    return result;
  }
  const Alignments = extractCompetencyTitles(
    cleanData(badgeData?.CompetencyObjects),
  );

  function handleImage(data: any) {
    return data
      ? data?.includes('.png')
        ? `${IMAGE_BASE_png}${data}`
        : `${IMAGE_BASE_jpg}${data}`
      : 'https://stable.tinyaward.com/Site/images/picture-placeholder.jpg';
  }
  function handleInfo() {
    navigation.navigate(screenNames.awardDetails, {
      data: data,
      screen: screenNames.infoDetails,
    });
  }
  return (
    <SafeAreaView style={styles.safeWrapper}>
      <StatusBar hidden />
      <View style={styles.headerWrapper}>
        <View style={styles.leftContainer}>
          <Text
            style={styles.headerText}
            testID="summary"
            accessibilityLabel="summary">
            {strings.summary}
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
      <LinearGradient
        colors={[colors.linerBlueGradientTwo, colors.linerBlueGradientOne]}
        start={{ x: 1.7, y: 0.4 }}
        end={{ x: 0.5, y: 0.6 }}
        style={styles.container}>
        <View>
          <ScrollView
            style={styles.scrollContainer}
            indicatorStyle="white"
            bounces={false}>
            <View style={styles.scrollWrapper}>
              <View
                style={styles.imageContainer}
                testID="awardLogo"
                accessibilityLabel="awardLogo">
                <Image
                  source={{ uri: badgeData?.Image }}
                  style={styles.imageWrapper}
                />
              </View>
              <Text
                style={styles.mainTitleTxt}
                testID="title"
                accessibilityLabel="title">
                {badgeData?.BadgeName}
              </Text>
              <Text
                style={styles.descriptionTxt}
                testID={'description'}
                accessibilityLabel={'description'}>
                {handleHtmlTxt(badgeData?.BadgeDescription)}
              </Text>
              <View style={styles.listWrapper}>
                {tags?.map((item: any) => {
                  return (
                    <View
                      style={styles.tagWrapper}
                      testID="tagButton"
                      accessibilityLabel="tagButton"
                      key={item}>
                      <Text
                        style={styles.tagTxt}
                        testID="tagTitle"
                        accessibilityLabel="tagTitle">
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <ListInfo
                title={strings.expries}
                value={badgeData?.ExpiresON || strings.never}
                titleId={'expires'}
                valueId={'expriesValue'}
              />
              <ListInfo
                title={strings.criteria}
                value={handleHtmlTxt(badgeData?.CriteriaHTML)}
                titleId={'criteria'}
                valueId={'criteriaValue'}
              />

              <View style={styles.containerAlignment}>
                <Text
                  style={styles.titleText}
                  testID={'alignmentText'}
                  accessibilityLabel={'alignmentText'}>
                  {strings?.Alignment}
                </Text>
                <View style={styles.right}>
                  {Alignments?.length > 0 ? (
                    Alignments?.map(item => {
                      return (
                        <>
                          <Text
                            style={[styles.alignmentText, styles.mainTitle]}
                            testID={'mainAlignment'}
                            accessibilityLabel={'mainAlignment'}>
                            {item?.title}
                          </Text>
                          {item?.options?.map(item => {
                            return (
                              <View
                                style={[
                                  styles.cirleAlignment,
                                  styles.subTitle,
                                ]}>
                                <View style={styles.circle} />
                                <Text
                                  style={styles.alignmentText}
                                  testID={'subTitle'}
                                  accessibilityLabel={'subTitle'}>
                                  {item}
                                </Text>
                              </View>
                            );
                          })}
                        </>
                      );
                    })
                  ) : (
                    <Text
                      style={styles.titleText}
                      testID={'none'}
                      accessibilityLabel={'none'}>
                      {strings?.none}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.detailContanier}>
                <View style={styles.issueTagWrapper}>
                  <Text
                    style={styles.issueTxt}
                    testID="issueTag"
                    accessibilityLabel="issueTag">
                    {strings.isssuedBy}
                  </Text>
                </View>
                <View style={styles.issuerWrapper}>
                  <Image
                    source={{
                      uri: handleImage(badgeData?.IssuerImage),
                    }}
                    style={styles.profileWrapper}
                    testID={'issuerProfile'}
                  />
                  <Text
                    style={styles.issueName}
                    testID={'issueByName'}
                    accessibilityLabel={'issueByName'}>
                    {badgeData?.IssuerName}
                  </Text>
                </View>
              </View>
              {badgeData?.EarnedOn ? (
                <ListInfo
                  title={strings.earn}
                  value={badgeData?.EarnedOn}
                  titleId={'earnedText'}
                  valueId={'earnedValue'}
                />
              ) : (
                <Pressable
                  style={styles.bottomButton}
                  onPress={handleInfo}
                  testID="goButton"
                  accessibilityLabel="goButton">
                  <Text
                    style={styles.detailsTxt}
                    testID="goText"
                    accessibilityLabel="goText">
                    {strings.go}
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default InfoDetails;
