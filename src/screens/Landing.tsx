import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import useNavigation from '../hooks/useNavigation';
import screenNames from '../global/screenNames';
import colors from '../global/colors';
import { getScaledFont, height, width } from '../global/fonts';
import { fonts } from '../assets';
import Tiny from '../assets/icons/tinyAwardsLogoCollapsed.svg'
import LinearGradient from 'react-native-linear-gradient';


const LandingScreen = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(screenNames.webLogin);
    };

    return (
        <View style={styles.container}>
            <Tiny
                width={175}
                height={175}
                style={{ marginBottom: 20 }}
            />
            <Text style={styles.welcomeText}>
                Welcome to the Tiny Award app!
            </Text>
            <Text style={styles.descriptionText}>
                This is a companion app to the Tiny Award website that will allow you to earn badges via your mobile device. Your journey starts at the site and you can follow this link to begin discovering badges.
            </Text>
            <Pressable style={styles.siteBtn} id={'Continue To Site'} onPress={handlePress}>
                <LinearGradient colors={['#f3bc16', '#f77c1e']} style={styles.siteBtn}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.siteBtnTxt} id='continueToSite'>
                            Continue To Site
                        </Text>
                    </View>
                </LinearGradient>
            </Pressable>
        </View >
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backGround, padding: 32 },
    welcomeText: { fontSize: 36, marginBottom: 20, color: colors.textWhite, textAlign: 'center', },
    descriptionText: {
        fontSize: 20, color: colors.textWhite, textAlign: 'center', marginBottom: 32, lineHeight: 30
    },
    siteBtn: {
        width: width(250),
        height: height(60),
        borderRadius: getScaledFont(8),
        fontSize: getScaledFont(24)
    },
    siteBtnTxt: {
        fontSize: getScaledFont(24),
        fontFamily: fonts.bold,
        color: colors.white,
        fontWeight: '700'
    },
});

export default LandingScreen;
