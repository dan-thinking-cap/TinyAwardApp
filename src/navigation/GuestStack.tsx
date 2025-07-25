import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import screenNames from '../global/screenNames';
import Login from '../screens/Login/Login';
import WebLogin from '../screens/Login/WebLogin';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  autoHideHomeIndicator: true,
  navigationBarHidden: true,
  freezeOnBlur: true,
  statusBarHidden: true,
};

function UserStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName={screenNames.login}
        screenOptions={screenOptions}>
        <Stack.Screen
          name={screenNames.login}
          component={Login}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.webLogin}
          component={WebLogin}
          options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}

export default memo(UserStack);
