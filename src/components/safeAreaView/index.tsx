import React, {ReactNode, memo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function SafeArea(props: ViewProps): ReactNode {
	const {top, bottom, left, right} = useSafeAreaInsets();
	const style = StyleSheet.flatten([
		props.style,
		{
			paddingTop: top,
			paddingBottom: bottom,
			paddingLeft: left,
			paddingRight: right,
		},
	]);

	return <View {...props} style={style} />;
}

export default memo(SafeArea);
