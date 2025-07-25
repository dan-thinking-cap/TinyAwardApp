/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {BackHandler, Platform, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import {store} from './store';
import Spinner from './components/Spinner';
import useNavigation from './hooks/useNavigation';

export function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.app}>
      <Provider store={store}>
        <Navigation />
        <Spinner />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({app: {flex: 1}});

export default App;
