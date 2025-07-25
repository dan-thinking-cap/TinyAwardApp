import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {height} from '../../global/fonts';

enum imageStates {
  idle = 'IDLE',
  loading = 'LOADING',
  loaded = 'LOADED',
  error = 'ERROR',
}

interface IProps extends FastImageProps {
  errorSource?: any;
}

function FastImages({
  source,
  errorSource,
  style,
  onLoadStart,
  onLoad,
  testID,
  onError,
  ...props
}: IProps) {
  const [state, setState] = useState<imageStates>(imageStates.idle);
  const [isImageError, setIsImageError] = useState(false);
  const onLoadStartFunc = useCallback(() => {
    setState(imageStates.loading);
    onLoadStart?.();
  }, [onLoadStart]);

  const onLoadFunc = useCallback(
    (event: any) => {
      setState(imageStates.loaded);
      onLoad?.(event);
    },
    [onLoad],
  );

  const onErrorFunc = useCallback(() => {
    setState(imageStates.error);
    onError?.();
  }, [onError]);

  const animation = useRef(new Animated.Value(0));
  useEffect(() => {
    let animationState: any;
    if (state === imageStates.loading) {
      animationState = Animated.loop(
        Animated.timing(animation.current, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ).start();
    } else {
      animationState?.stop?.();
    }
    return () => animationState?.stop?.();
  }, [state]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.hidden,
        {justifyContent: 'center', alignItems: 'center'},
        style,
      ])}>
      <FastImage
        source={
          source
          // state === imageStates.error && errorSource ? errorSource : source
          // isImageError
          //   ? {
          //       uri: getNoImageFoundUrl(),
          //     }
          //   : source
        }
        resizeMode="contain"
        style={styles.full}
        onLoadStart={onLoadStartFunc}
        onLoad={onLoadFunc}
        // onError={setIsImageError}
        onError={() => {
          setIsImageError(true);
        }}
        testID={testID}
        accessibilityLabel={testID}
        {...props}
      />
      {state === imageStates.loading ? (
        // <Animated.View
        //   style={StyleSheet.flatten([
        //     styles.absolute,
        //     style,
        //     {
        //       backgroundColor: animation.current.interpolate({
        //         inputRange: [0, 0.5, 1],
        //         outputRange: [`#a6a6a6`, `#f4b58b`, `#a6a6a6`],
        //       }),
        //     },
        //   ])}
        // />
        <ActivityIndicator
          style={StyleSheet.flatten([styles.absolute, style])}
        />
      ) : null}
    </View>
  );
}

export default memo(FastImages);

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
  },
  hidden: {
    overflow: 'hidden',
  },
});
