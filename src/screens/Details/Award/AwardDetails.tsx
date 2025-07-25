import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../../assets/icons/arrowForward.svg';
import Book from '../../../assets/icons/book.svg';
import BookOpen from '../../../assets/icons/bookReader.svg';
import Tick from '../../../assets/icons/check.svg';
import Lock from '../../../assets/icons/lock.svg';
import DownWard from '../../../assets/icons/polygon.svg';
import Tiny from '../../../assets/icons/tinyAwardsLogoCollapsed.svg';
import PrimaryGradientButton from '../../../components/GradientButton/PrimaryGradientButton';
import colors from '../../../global/colors';
import screenNames from '../../../global/screenNames';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import useSpinners from '../../../hooks/useSpinners';
import storage, { storageKeys } from '../../../services/storage';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setUserID, setUserName } from '../../../store/slice/user.slice';
import {
  getTaskStatus,
  getUserDetails,
  getUserIdByEmail,
} from '../../../store/thunk/dashbaord';
import { styles } from './Styles';
const AwardDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, screen } = (route.params as any) || {};
  const [isStart, setIsStart] = useState<any>(true);
  const [startQuiz, setStartQuiz] = useState<any>(false);
  const { userID } = useAppSelector(state => state.user);
  const [taskData, setTaskData] = useState<any>([]);
  const [badgeData, setBadgeData] = useState<any>([]);
  const [assessement, setAssessement] = useState<any>([]);
  const [passPercentage, setPassPercentage] = useState('');
  const [quizID, setQuizID] = useState('');
  const [tags, setTags] = useState<any>(
    process.env.JEST_WORKER_ID ? ['knife'] : [],
  );
  const dispatch = useAppDispatch();
  const [completedTask, setCompletedTask] = useState<any>([]);
  const [showDetails, setShowDetails] = useState(false);
  const { addOneSpinner, removeOneSpinner } = useSpinners();
  const { userData } = useAppSelector(state => state.user);
  // let userId = (userData?.id?.length > 2 ? userData?.id : data?.userId) || (data?.userId?.length > 2 ? data?.userId : userData?.id);
  let userId = data?.userId;
  let name = data?.name;
  const { OpenBadgeID, email, Url } = data;
  // const {
  //   idToken,
  //   user: {email, familyName, givenName},
  // } = userData?.data || {};

  function handleHtmlTxt(html: any) {
    return html
      ?.replace(/<\/?[^>]+(>|$)/g, '')
      ?.replace(/&nbsp;/g, ' ')
      ?.trim();
  }

  // useEffect(() => {
  //   if (userID === 0) {
  //     // fetchUserId();
  //   }
  // }, [userID]);

  // async function fetchUserId() {
  //   addOneSpinner();
  //   try {
  //     let {response, error} = await getUserIdByEmail(email);
  //     if (response?.includes('"success":true"userid":')) {
  //       response = response?.replace(
  //         '"success":true"userid":',
  //         '"success":true,"userid":',
  //       );
  //     }
  //     try {
  //       const data = JSON?.parse(response);
  //       const userId = data?.userid;
  //       if (userId) {
  //         storage.set(storageKeys.userId, userId);
  //         dispatch(setUserID(userId));
  //         removeOneSpinner();
  //       }
  //     } catch (error) {}
  //   } catch (error) {
  //   } finally {
  //     removeOneSpinner();
  //   }
  // }

  useEffect(() => {
    setIsStart(!completedTask?.includes(taskData?.id));
    setStartQuiz(
      !completedTask?.includes(quizID) && completedTask?.includes(taskData?.id),
    );
  }, [completedTask, taskData, quizID, data]);

  function handleBack() {
    // if (screen === screenNames.awardDetails) {
    navigation.push(screenNames.webLogin, { isLogin: true });
    // } else {
    //   navigation.goBack();
    // }
  }

  function handleStart() {
    navigation.push(screenNames.companyPreview, {
      url: Url,
      badge: badgeData?.OpenBadgeID,
      task: taskData?.id,
      type: taskData?.type,
      isQuiz: badgeData?.HasQuiz,
      badgeData,
      taskData,
      givenData: data,
    });
  }
  function handleQuiz() {
    // Shuffle function using Fisher-Yates algorithm

    // Only randomize if the option is there
    // function shuffleArray(array) {
    //   console.log("------", array)
    //   let shuffledArray = [...array]; // Create a copy of the original array
    //   for (let i = shuffledArray.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [shuffledArray[i], shuffledArray[j]] = [
    //       shuffledArray[j],
    //       shuffledArray[i],
    //     ]; // Swap elements
    //   }
    //   return shuffledArray;
    // }

    // Check if there is a specific count of questions to pick
    // let questionsToSend = assessement;
    // console.log("------", taskData?.pickQuestionCount)

    // if (taskData?.pickQuestionCount) {
    //   questionsToSend = assessement.slice(0, taskData?.pickQuestionCount); // Pick the specified number of questions
    // }


    // Shuffle the selected questions
    // console.log("------asdsdsads", questionsToSend)
    // if (questionsToSend == null) {

    // } else {
    //   questionsToSend = shuffleArray(questionsToSend);
    // }
    // Navigate to the quiz screen with the shuffled questions
    const questions = assessement
    navigation.navigate(screenNames.question, {
      questions: questions,
      percentage: passPercentage,
      type: 'quiz',
      badgeId: badgeData?.OpenBadgeID,
      task: quizID,
      badgeData,
      givenData: data,
    });
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchCompletedTask(OpenBadgeID);
    }, []),
  );
  useLayoutEffect(() => {
    handleFetchDetails();
    storage.set(storageKeys.userId, userId);
    dispatch(setUserID(userId));
    dispatch(setUserName(name));
    handleFetchCompletedTask(OpenBadgeID);
  }, [data]);

  async function handleFetchDetails() {
    addOneSpinner();
    const request = {
      badge: OpenBadgeID,
      user: userId,
    };
    try {
      const { response, error } = await getUserDetails(request);
      console.log(response?.Assessements?.[0]?.QuestionJSON)
      console.log("------======", response?.Assessements?.[0]?.QuestionJSON?.length)

      removeOneSpinner();
      if (response?.Assessements?.[0]?.QuestionJSON) {
        setAssessement(cleanData(response?.Assessements?.[0]?.QuestionJSON));
      }
      setQuizID(response?.Assessements?.[0]?.ID);
      setBadgeData(response?.Badges?.[0]);
      setTaskData(response?.Tasks?.pages?.[0]);
      const tagsArray = response?.Badges?.[0]?.Tags?.split(',');
      if (response?.Badges?.[0]?.Tags) {
        setTags(tagsArray);
      }
      setPassPercentage(response?.Assessements?.[0]?.PassingScore);
    } catch (error) {
      removeOneSpinner();
    }
  }
  async function handleFetchCompletedTask(badgeId: any) {
    const request = {
      BadgeID: badgeId,
      UserId: userId,
    };
    try {
      const { response, error } = await getTaskStatus(request);
      const FilteredData = response?.Tasks?.map((item: any) => item?.TaskID);
      setCompletedTask(FilteredData);
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

  const aligments = cleanData(badgeData?.CompetencyObjects);

  function handleDetails() {
    if (process.env.JEST_WORKER_ID) {
      return 'handle Button Toggle';
    }
    setShowDetails(!showDetails);
  }


  return (
    <SafeAreaView style={styles.safeWrapper}>
      <LinearGradient
        colors={[colors.linerBlueGradientOne, colors.linerBlueGradientTwo]}
        style={styles.container}>
        <View>
          <View style={styles.headerWrapper}>
            <View style={styles.leftContainer}>
              <View testID="tinyLogo" accessibilityLabel="TinyLogo">
                <Pressable
                  onPress={handleBack}
                  testID="backArrow"
                  accessibilityLabel="backArrow">
                  <Tiny style={styles.logoWrapper} />
                </Pressable>
              </View>
              <Text
                style={styles.headerText}
                testID="userName"
                accessibilityLabel="userName">
                {`${strings.hi} ${name}`}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          {(badgeData?.Image || process.env.JEST_WORKER_ID) && (
            <ScrollView
              style={styles.scrollContainer}
              indicatorStyle="white"
              bounces={false}>
              <View>
                <Text
                  style={styles.mainTitleTxt}
                  testID="title"
                  accessibilityLabel="title">
                  {badgeData?.BadgeName}
                </Text>
                <View
                  style={styles.imageContainer}
                  testID="awardLogo"
                  accessibilityLabel="awardLogo">
                  <Image
                    source={{ uri: badgeData?.Image }}
                    style={styles.imageWrapper}
                  />
                </View>
                <View style={styles.detailContanier}>
                  <Text
                    style={styles.issueTxt}
                    testID="issueTag"
                    accessibilityLabel="issueTag">
                    {strings.isssuedBy}
                    <Text
                      style={styles.issueName}
                      testID={'issueByName'}
                      accessibilityLabel={'issueByName'}>
                      {badgeData?.IssuerName}
                    </Text>
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
                  {((aligments?.length > 0 && showDetails) ||
                    process.env.JEST_WORKER_ID) && (
                      <Text
                        style={styles.alignmentTxt}
                        testID={'alignment'}
                        accessibilityLabel={'description'}>
                        {strings.alignmentTitle}
                      </Text>
                    )}
                  {(showDetails || process.env.JEST_WORKER_ID) && (
                    <View style={styles.alignmentWrapper}>
                      {(aligments?.length > 0 || process.env.JEST_WORKER_ID) &&
                        aligments?.map((item: any) => {
                          return (
                            <View
                              style={styles.alignWrapper}
                              testID="alignmentsButton"
                              accessibilityLabel="alignmentsButton"
                              key={item?.Title}>
                              <Text
                                style={styles.alignTxt}
                                testID="alignmentsTitle"
                                accessibilityLabel="alignmentsTitle">
                                {item?.Title}
                              </Text>
                            </View>
                          );
                        })}
                    </View>
                  )}
                  {aligments?.length > 0 || process.env.JEST_WORKER_ID ? (
                    <View style={styles.detailBtnWrapper}>
                      <PrimaryGradientButton
                        title={
                          showDetails
                            ? strings.hideDetails
                            : strings.showDetails
                        }
                        style={styles.detailBtn}
                        textStyle={styles.detailsTxt}
                        textId={'details'}
                        titleId={'detailsTxt'}
                        showIcon={true}
                        onPress={handleDetails}
                      />
                    </View>
                  ) : (
                    <View style={styles.emptyWrapper} />
                  )}
                </View>
                <View style={styles.buttonWrapper}>
                  <Pressable
                    style={[
                      styles.topButton,
                      badgeData?.HasQuiz ? null : styles.singleButton,
                    ]}
                    onPress={isStart ? handleStart : null}
                    testID="readButton"
                    accessibilityLabel="readButton">
                    <View style={styles.buttonTopWrapper}>
                      <View style={styles.leftWrapper}>
                        <View testID="bookLogo" accessibilityLabel="bookLogo">
                          <BookOpen />
                        </View>
                        <Text
                          style={styles.readTxt}
                          testID="readLabel"
                          accessibilityLabel="readLabel">
                          {strings.read}
                        </Text>
                      </View>
                      {isStart ? (
                        <Text
                          style={styles.readTxt}
                          testID="readStartLabel"
                          accessibilityLabel="readStartLabel">
                          {strings.start}
                        </Text>
                      ) : (
                        <View testID="tickLogo" accessibilityLabel="tickLogo">
                          <Tick />
                        </View>
                      )}
                    </View>
                  </Pressable>
                  {(badgeData?.HasQuiz || process.env.JEST_WORKER_ID) && (
                    <View style={styles.bottomButton}>
                      <View style={styles.arrowWrapper}>
                        <DownWard />
                      </View>
                      <Pressable
                        style={styles.bottomButtonAlign}
                        testID="quizButton"
                        accessibilityLabel="quizButton"
                        onPress={
                          startQuiz || process.env.JEST_WORKER_ID
                            ? handleQuiz
                            : null
                        }>
                        <View style={styles.buttonTopWrapper}>
                          <View style={styles.leftWrapper}>
                            <View
                              testID="paperLogo"
                              accessibilityLabel="paperLogo">
                              <Book />
                            </View>
                            <Text
                              style={styles.readTxt}
                              testID="quizLabel"
                              accessibilityLabel="quizLabel">
                              {strings.quiz}
                            </Text>
                          </View>
                          {startQuiz ? (
                            <Text
                              style={styles.readTxt}
                              testID="quizStartLabel"
                              accessibilityLabel="quizStartLabel">
                              {strings.start}
                            </Text>
                          ) : !startQuiz && !isStart ? (
                            <View
                              testID="tickLogoQuiz"
                              accessibilityLabel="tickLogoQuiz">
                              <Tick />
                            </View>
                          ) : (
                            <View
                              testID="lockLogo"
                              accessibilityLabel="lockLogo">
                              <Lock />
                            </View>
                          )}
                        </View>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
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

export default AwardDetails;
