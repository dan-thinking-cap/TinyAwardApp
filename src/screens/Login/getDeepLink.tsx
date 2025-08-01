import { Platform } from 'react-native'
export const getDeepLink = (path = '') => {
  const scheme = 'tinyaward'
  const prefix = Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`
  return prefix + path
}