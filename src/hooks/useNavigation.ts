import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

import {useCallback} from 'react';

export default function () {
  const navigation = useNavigation();

  const push = useCallback(
    (screenName: string, params?: Record<string, any>) => {
      navigation.dispatch(StackActions.push(screenName, params));
    },
    [navigation],
  );
  const navigate = useCallback(
    (screenName: string, params?: Record<string, any>) => {
      navigation.dispatch(CommonActions.navigate(screenName, params));
    },
    [navigation],
  );
  const replace = useCallback(
    (screenName: string, params?: Record<string, any>) => {
      navigation.dispatch(StackActions.replace(screenName, params));
    },
    [navigation],
  );
  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);
  const reset = useCallback(
    (screenName: any) => {
      navigation.reset({
        index: 0,
        routes: [screenName],
      });
    },
    [navigation],
  );

  return {push, navigate, replace, goBack, reset};
}
