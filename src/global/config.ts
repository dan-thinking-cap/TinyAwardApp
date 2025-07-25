import {Dimensions, Platform} from 'react-native';
import DeviceInfo, {isTablet} from 'react-native-device-info';

export const isTab = DeviceInfo.isTablet();
export const id = DeviceInfo.getUniqueIdSync();
export const model = DeviceInfo.getDeviceId;

export const device = {
  designHeight: 1024,
  designWidth: isTab ? 1366 : 480,
  height: Dimensions.get('screen').height,
  id: id,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  model: model,
  width: Dimensions.get('screen').width,
};
