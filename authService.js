import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'YOUR_AUTH0_DOMAIN',
  clientId: 'YOUR_MOBILE_APP_CLIENT_ID',
});

export async function login() {
  try {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
      audience: 'https://YOUR_AUTH0_DOMAIN/userinfo',
    });
    console.log(credentials);
    // Store tokens securely, e.g., in SecureStorage or AsyncStorage
    return credentials;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    await auth0.webAuth.clearSession();
  } catch (error) {
    console.error(error);
  }
}
