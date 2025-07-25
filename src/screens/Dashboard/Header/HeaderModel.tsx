import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import TinyAward from '../../../assets/icons/tinyAwardLogo.svg';
import MenuPopup from '../../../components/MenuPopup';
import {useAppSelector} from '../../../store';
import {getNotificationCount} from '../../../store/thunk/dashbaord';
import {styles} from '../styles';

const HeaderModel = () => {
  const [count, setCount] = useState(0);
  const {userData, loginType} = useAppSelector(state => state.user);
  const photo = userData?.data?.user?.photo;

  useEffect(() => {
    handleFetchCount();
  }, []);
  async function handleFetchCount() {
    try {
      const {response, error} = await getNotificationCount();
      setCount(response?.TotalCount);
    } catch (error) {}
  }

  return (
    <View style={styles.headerWrapper}>
      <View accessibilityLabel="tinyAwardIcon" testID="tinyAwardIcon">
        <TinyAward style={styles.logoWrapper} />
      </View>
      <View style={styles.headerRightWrapper}>
        {/* <View
          style={[styles.notificationWrapper, styles.countEnd]}
          accessibilityLabel="notificationIcon"
          testID="notificationIcon">
          <Notification />
          {count > 0 && (
            <Text
              style={styles.countText}
              accessibilityLabel="notificationCount"
              testID="notificationCount">{` (${count}) `}</Text>
          )}
        </View> */}
        <View style={styles.notificationWrapper}>
          <Image
            style={styles.imageWrapper}
            source={{
              uri: photo,
            }}
            accessibilityLabel="userProfile"
            testID="userProfile"
          />
          {!process.env.JEST_WORKER_ID && <MenuPopup type={loginType} />}
          {/* <Pressable accessibilityLabel="downWardArrow" testID="downWardArrow">
            <DownArrow />
          </Pressable> */}
        </View>
        {/* <Pressable accessibilityLabel="menuIcon" testID="menuIcon">
          <Menu />
        </Pressable> */}
      </View>
    </View>
  );
};

export default HeaderModel;
