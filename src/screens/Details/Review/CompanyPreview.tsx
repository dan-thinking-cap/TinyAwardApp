import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  I18nManager,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Clear from '../../../assets/icons/clear.svg';
import Arrow from '../../../assets/icons/forwardArrow.svg';
import ScrollText from '../../../assets/icons/scrollTitle.svg';
import Logo from '../../../assets/icons/tinyAwardsLogoCollapsed.svg';
import { getScaledFont, height, width } from '../../../global/fonts';
import screenNames from '../../../global/screenNames';
import strings from '../../../global/strings';
import useNavigation from '../../../hooks/useNavigation';
import { useAppSelector } from '../../../store';
import { updateTaskStatus } from '../../../store/thunk/dashbaord';
import { styles } from './Styles';
import { Bar, CircleSnail } from 'react-native-progress';
import colors from '../../../global/colors';
import Start from '../../../assets/icons/play.svg';
import Stop from '../../../assets/icons/stop.svg';

const CompanyPreview = () => {
  const [percentage, setPercentage] = useState<any>(0);
  const { userID } = useAppSelector(state => state.user);
  const route = useRoute();
  const { url, badge, type, task, isQuiz, badgeData, taskData, givenData } =
    (route?.params as any) || {};
  const { scrollPercentage, signoffText, signoff, minReadTime } =
    (taskData as any) || {};
  const [time, setTime] = useState(minReadTime ?? '00:00:00');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('00:00:00');
  const [completed, setCompleted] = useState(false);
  const timeCompleted = time === '00:00:00';
  const webViewRef = useRef<WebView>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const injectedJS = `
    (function() {
      // SCROLL TRACKING
      document.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = totalHeight > 0 ? Math.round((scrollTop/totalHeight)*100) : 0;
        window.ReactNativeWebView.postMessage(JSON.stringify({type:'scroll', scrollPercentage: pct}));
      }, true);

      // VIDEO TRACKING
      setInterval(() => {
        const video = document.querySelector('video');
        if (video) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'video',
            currentTime:  Math.floor(video.currentTime),
            duration:     Math.floor(video.duration)
          }));
        }
      }, 1000);
    })();
    true; // <— ensure the script succeeded
  `;

  // const handleMessage = event => {
  //   const data = JSON?.parse(event?.nativeEvent?.data);
  //   if (data?.type === 'video') {
  //     setCurrentTime(data?.currentTime);
  //     setDuration(data?.duration);
  //   } else {
  //     if (type === 'visit-scroll') {
  //       setPercentage(data);
  //     }
  //   }
  // };
  const handleMessage = useCallback(({ nativeEvent }) => {
    let data;
    try { data = JSON.parse(nativeEvent.data); }
    catch { return; }
    if (data.type === 'scroll') {
      setPercentage(data.scrollPercentage)
    } else if (data.type === 'video') {
      console.log('VIDEO TIME', data.currentTime, '/', data.duration);
    }
  }, []);

  const formatTime = time => {
    const roundedTime = Math?.floor(time);
    const hours = Math?.floor(roundedTime / 3600);
    const minutes = Math?.floor((roundedTime % 3600) / 60);
    const seconds = (roundedTime % 60)?.toString()?.padStart(2, '0');
    const updateHour = hours > 10 ? hours : hours?.toString()?.padStart(2, '0');
    return `${updateHour}:${minutes?.toString()?.padStart(2, '0')}:${seconds}`;
  };

  const totalWatchPrecentage =
    duration > 0 && ((currentTime / duration) * 100)?.toFixed(0);
  async function handleCompletedTask({ userID, task, type, badge }: any) {
    const request = { userID, task, type, badge };
    try {
      const { response, error } = await updateTaskStatus(request);
      if (response?.success && isQuiz) {
        navigation.push(screenNames.awardDetails, { data: givenData });
      } else if (response?.success && !isQuiz) {
        navigation.navigate(screenNames.success, {
          data: badgeData,
          userID,
          badge,
        });
      }
      if (error) {
        Alert.alert(`${error}`);
      }
    } catch (error) { }
  }

  useEffect(() => {
    if (
      (signoff === false &&
        scrollPercentage !== 0 &&
        percentage >= scrollPercentage) ||
      (signoff === false &&
        scrollPercentage === 0 &&
        percentage > 99 &&
        type === 'visit-scroll')
    ) {
      handleCompletedTask({ userID, task, type, badge });
    }
  }, [signoff, scrollPercentage, percentage]);

  useEffect(() => {
    if (
      formatTime(currentTime) === formatTime(duration) &&
      type === 'watch' &&
      duration > 0
    ) {
      handleCompletedTask({ userID, task, type, badge });
    }
  }, [currentTime, duration]);

  useFocusEffect(
    useCallback(() => {
      if (signoff && minReadTime) {
        setCompleted(true);
        countdown(minReadTime);
      } else if ((signoff && minReadTime) === null) {
        setCompleted(true);
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (timeCompleted || time === null) {
        setTitle(signoffText);
      } else {
        setTitle(time);
      }
    }, [time, timeCompleted]),
  );



  function countdown(time: any) {
    let [hours, minutes, seconds] = time?.split(':')?.map(Number);
    const interval = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
        return;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          hours--;
          minutes = 59;
        } else {
          minutes--;
        }
        seconds = 59;
      } else {
        seconds--;
      }
      const formattedHours = String(hours)?.padStart(2, '0');
      const formattedMinutes = String(minutes)?.padStart(2, '0');
      const formattedSeconds = String(seconds)?.padStart(2, '0');
      const output = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      setTime(output);
    }, 1000);
  }

  function handleDone() {
    if (timeCompleted) handleCompletedTask({ userID, task, type, badge });
  }

  function handleClose() {
    setCompleted(false);
    navigation.navigate(screenNames.awardDetails, { data: givenData });
  }
  const LoaderView = (
    <View style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backGround,
    }}>
      <View style={{
        height: height(150),
        aspectRatio: 1,
        borderRadius: getScaledFont(8),
        backgroundColor: colors.darkBlue,
        position: 'absolute',
      }} />
      <CircleSnail
        size={49}
        thickness={1}
        direction={I18nManager.isRTL ? 'counter-clockwise' : 'clockwise'}
        color={colors.white}
      />
    </View>
  );
  // const LoaderView = () => {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // };

  useEffect(() => {
    if (type === 'watch' && Number(totalWatchPrecentage) > 0) {
      setPercentage(Number(totalWatchPrecentage));
    }
  }, [type, totalWatchPrecentage]);

  // function handleScrollOverLay() {
  //   return (
  //     <View style={styles.scrollwrapper}>
  //       <Bar
  //         progress={percentage / 100}
  //         height={width(84)}
  //         width={height(350)}
  //         testID="ScrollBar"
  //         accessibilityLabel="ScrollBar"
  //         style={styles.progressWrapper}
  //         unfilledColor={colors.scrollDisabled}
  //         color={colors.scrollEnabled}
  //       />
  //       <View style={styles.scrollHeader}>
  //         <Logo accessibilityLabel="logo" testID="logo" />
  //         <ScrollText
  //           accessibilityLabel="scrollTxt"
  //           testID="scrollTxt"
  //           style={{transform: [{rotate: '90deg'}]}}
  //         />
  //         <Arrow
  //           accessibilityLabel="forwardArrow"
  //           testID="forwardArrow"
  //           style={{transform: [{rotate: '90deg'}]}}
  //         />
  //         <View style={styles.scrollLeftWrapper}>
  //           <Text
  //             style={
  //               styles.percentageTxt
  //             }>{`${percentage}${strings.percentage}`}</Text>
  //           <Pressable
  //             onPress={handleClose}
  //             accessibilityLabel="cancelBtn"
  //             testID="cancelBtn">
  //             <Text style={styles.cancelText}>{strings.cancel}</Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  const startVideo = () => {
    webViewRef?.current?.injectJavaScript(`
      if (!window.video) {
        window.video = document.querySelector('video');
      }
      if (window.video) {
        window.video.play();
      }
      true;
    `);
  };

  const stopVideo = () => {
    webViewRef?.current?.injectJavaScript(`
      if (!window.video) {
        window.video = document.querySelector('video');
      }
      if (window.video) {
        window.video.pause();
      }
      true; 
    `);
  };

  function handleWatchTimer() {
    return (
      <View style={styles.watchWrapper}>
        <View style={styles.videoWrapper}>
          <Pressable onPress={startVideo}>
            <Start height={getScaledFont(40)} width={getScaledFont(40)} />
          </Pressable>
          <Text style={styles.watchText}>/</Text>
          <Pressable onPress={stopVideo}>
            <Stop height={getScaledFont(40)} width={getScaledFont(40)} />
          </Pressable>
        </View>
        <Text style={styles.watchText}>{`${formatTime(
          currentTime,
        )}/${formatTime(duration)}`}</Text>
        <Pressable onPress={handleClose}>
          <Text style={styles.watchCancel}>{strings.cancel}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <View style={styles.topWrapper}>
        <Bar
          progress={!(completed && !loading) && percentage / 100}
          height={width(84)}
          width={null}
          testID="ScrollBar"
          accessibilityLabel="ScrollBar"
          style={styles.progressWrapper}
          unfilledColor={colors.scrollDisabled}
          color={colors.scrollEnabled}
        />
        <View style={styles.headerWrapper}>
          <Logo accessibilityLabel="logo" testID="logo" />
          <ScrollText accessibilityLabel="scrollTxt" testID="scrollTxt" />
          <Arrow
            accessibilityLabel="forwardArrow"
            testID="forwardArrow"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
          <View style={styles.leftWrapper}>
            <Text style={styles.percentageTxt}>
              {!(completed && !loading)
                ? `${percentage}${strings.percentage}`
                : ''}
            </Text>
            {/* <Pressable
              onPress={handleClose}
              accessibilityLabel="cancelBtn"
              testID="cancelBtn">
              <Clear
                height={height(40)}
                width={width(40)}
                accessibilityLabel="cancelTxt"
                testID="cancelTxt"
              />
            </Pressable> */}
          </View>
        </View>
      </View>
      <View style={styles.webView}>
        {loading && LoaderView}
        {!process.env.JEST_WORKER_ID && (
          <WebView
            source={{
              uri: url,
            }}
            ref={webViewRef}
            injectedJavaScript={injectedJS}
            javaScriptEnabled={true}
            onMessage={handleMessage}
            style={styles.webView}
            testID="webView"
            accessibilityLabel="webView"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => {
              setLoading(false)
              webViewRef.current?.injectJavaScript('true;');
            }}

            bounces={false}
            allowsFullscreenVideo={false}
          />
        )}
      </View>
      {completed && !loading && (
        <View style={styles.bottomContext}>
          <Pressable
            style={[styles.bottomBtn, { opacity: timeCompleted ? 1 : 0.5 }]}
            onPress={handleDone}
            accessibilityLabel="doneBtn"
            testID="doneBtn">
            <Text
              style={styles.buttonTxt}
              accessibilityLabel="buttonTxt"
              testID="buttonTxt">
              {title}
            </Text>
          </Pressable>
          {/* {percentage > 1 ? (
            <Bar
              progress={percentage / 100}
              height={height(3)}
              width={null}
              testID="ScrollBar"
              accessibilityLabel="ScrollBar"
              style={styles.progressWrapper}
              unfilledColor={colors.white}
              color={colors.darkYellow}
            />
          ) : (
            <View style={styles.emptyView} />
          )} */}
        </View>
      )}
      {type === 'watch' && handleWatchTimer()}
      {/* {handleScrollOverLay()} */}
    </SafeAreaView>
  );
};

export default CompanyPreview;
