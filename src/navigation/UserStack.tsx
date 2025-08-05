import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { memo } from 'react';
import screenNames from '../global/screenNames';
import Dashboard from '../screens/Dashboard/Dashboard';
import AwardDetails from '../screens/Details/Award/AwardDetails';
import CompanyPreview from '../screens/Details/Review/CompanyPreview';
import Question from '../screens/Details/Question/Question';
import Success from '../screens/Details/Success/Success';
import AvailableBagdes from '../screens/Details/AvaiableBadges/AvailableBadges';
import InfoDetails from '../screens/Details/InfoDetails/InfoDetails';
import WebLogin from '../screens/Login/WebLogin';
import LandingScreen from '../screens/Landing';
import AR from '../screens/AR/AR';
import Map from '../screens/AR/Map'
import { GeolocationProvider } from '../context/GeolocationContext';
import PermissionRedirect from '../screens/Redirect/PermissionRedirect';
const Stack = createNativeStackNavigator();
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  autoHideHomeIndicator: true,
  navigationBarHidden: true,
  freezeOnBlur: true,
  animation: 'none',
};
function GuestStack() {
  return (
    <GeolocationProvider>
      <Stack.Navigator
        initialRouteName={screenNames.landingScreen}
        screenOptions={screenOptions}>
        <Stack.Screen name={screenNames.landingScreen} component={LandingScreen} />
        <Stack.Screen name={screenNames.dashboard} component={WebLogin} />
        <Stack.Screen
          name={screenNames.awardDetails}
          component={AwardDetails}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.webLogin}
          component={WebLogin}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.companyPreview}
          component={CompanyPreview}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.question}
          component={Question}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.success}
          component={Success}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.availableBadges}
          component={AvailableBagdes}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.infoDetails}
          component={InfoDetails}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.AR}
          component={AR}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.map}
          component={Map}
          options={screenOptions}
        />
        <Stack.Screen
          name={screenNames.permissionRedirect}
          component={PermissionRedirect}
          options={screenOptions}
        />
      </Stack.Navigator>
    </GeolocationProvider>

  );
}

export default memo(GuestStack);
