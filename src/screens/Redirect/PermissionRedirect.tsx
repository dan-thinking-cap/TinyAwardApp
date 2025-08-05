import { View, Text, Linking, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import useNavigation from '../../hooks/useNavigation'
import RNRestart from 'react-native-restart'
import colors from '../../global/colors'
import { getScaledFont, height, width } from '../../global/fonts'
import { fonts } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'

const PermissionRedirect = () => {
  const router = useRoute()
  const { permissionNames } = (router?.params as any) || {}
  const navigation = useNavigation()


  const restartApp = () => {
    RNRestart.restart()
  }

  const openSettings = () => {
    // deep-link into the OS settings so they can grant the permission manually
    Linking.openSettings()
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You need to allow {permissionNames?.length > 1 ? `${permissionNames[0]}, and ${permissionNames[1]}` : permissionNames[0]} access to use this feature.
      </Text>
      <View style={{ gap: 24 }}>
        <Pressable onPress={openSettings} style={styles.btn}>
          <LinearGradient colors={['#f3bc16', '#f77c1e']} style={styles.btn}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.btnTxt}>
                Open Settings
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={restartApp} style={styles.btn}>
          <LinearGradient colors={['#f3bc16', '#f77c1e']} style={styles.btn}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.btnTxt}>
                Reload App
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backGround, padding: 32, gap:32 },
  text: { fontSize: 36, marginBottom: 20, color: colors.textWhite, textAlign: 'center', },
  descriptionText: {
    fontSize: 20, color: colors.textWhite, textAlign: 'center', marginBottom: 32, lineHeight: 30
  },
  btn: {
    width: width(250),
    height: height(60),
    borderRadius: getScaledFont(8),
    fontSize: getScaledFont(24)
  },
  btnTxt: {
    fontSize: getScaledFont(24),
    fontFamily: fonts.bold,
    color: colors.white,
    fontWeight: '700'
  },
});


export default PermissionRedirect
