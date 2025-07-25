import { StyleSheet } from 'react-native';
import colors from '../../global/colors';

export const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  webViewContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.backGround
  },
  webView: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
}); 