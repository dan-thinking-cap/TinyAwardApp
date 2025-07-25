import {PixelRatio} from 'react-native';
import {device} from './config';

const scale = device.width / device.designWidth;

export const getScaledFont = (size: number) => {
  const adjustedSize = size * scale;
  return PixelRatio.roundToNearestPixel(adjustedSize);
};

export function width(pixels: number) {
  return device.width * (pixels / device.designWidth);
}
export function height(pixels: number) {
  return device.height * (pixels / device.designHeight);
}
