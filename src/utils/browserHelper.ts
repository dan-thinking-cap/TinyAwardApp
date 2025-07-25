import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking, Platform } from 'react-native';

export const openInBrowser = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      return await InAppBrowser.open(url, {
        // Hiding UI elements
        showTitle: false, // No title in Android
        enableUrlBarHiding: true, // Android-specific
        enableDefaultShare: false, // Disable share option
        hideToolbar: true, // Android toolbar
        hideTitleBar: true, // Android-specific
        hideUrlBar: true, // Android-specific
        hideNavigationButtons: true, // Disable navigation buttons
        
        // Colors
        toolbarColor: '#16053d',
        secondaryToolbarColor: '#16053d',
        navigationBarColor: '#16053d',
        navigationBarDividerColor: '#16053d',
        enableUrlBarHiding: true,
        
        // iOS-specific settings
        dismissButtonStyle: 'close', // Minimal UI close button
        modalPresentationStyle: 'overFullScreen', // Fullscreen
        preferredBarTintColor: '#16053d', // Match app background
        preferredControlTintColor: "#16053d", // Button tint color

        // Animation and display
        modalEnabled: true, // Use modal view
        animated: true, // Animated transitions
        enableBarCollapsing: false, // Prevent collapsing toolbar
        showAfterLoad: true, // Ensure content is loaded before showing

        // Miscellaneous
        closeOnError: true, // Close if error occurs
        forceCloseOnRedirection: true, // Close previous tab on redirection
      });
    } else {
      return Linking.openURL(url); // Fallback for unsupported browsers
    }
  } catch (error) {
    console.error('Error opening browser:', error);
    return null;
  }
}; 