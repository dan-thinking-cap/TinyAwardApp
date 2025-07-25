import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
// import {
//   AccessToken,
//   LoginManager,
//   Profile,
//   Settings,
// } from 'react-native-fbsdk-next';
import {jwtDecode} from 'jwt-decode';
import strings from '../../global/strings';
import {setLoginType, setUserData} from '../../store/slice/user.slice';
export const clientId =
  'amzn1.application-oa2-client.a7488cb5f2f34470833b4e1d21369a8e';
export const redirectUri = 'https://tinyaward.com/login.aspx';
// export const redirectUri = 'https://192.168.0.50/tinyreward/login.aspx';
// export const redirectUri = 'https://stable.tinyreward.com/login.aspx';
export const amazonOAuthUrl = `https://na.account.amazon.com/ap/signin?client_id=${clientId}_encoding=UTF8&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.pape.max_auth_age=0&ie=UTF8&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=lwa&openid.assoc_handle=amzn_lwa_na&marketPlaceId=ATVPDKIKX0DER&arb=ce361d7d-faf5-4b45-a71a-22f753204353&language=en_GB&openid.return_to=https%3A%2F%2Fna.account.amazon.com%2Fap%2Foa%3FmarketPlaceId%3DATVPDKIKX0DER%26arb%3Dce361d7d-faf5-4b45-a71a-22f753204353%26language%3Den_GB&enableGlobalAccountCreation=1&metricIdentifier=amzn1.application.9b6373047eac40db96898ec609f8a7da&signedMetricIdentifier=bgy2gDwpsUzVzq0LMkV6ib44Z3HmbSfAZcyVy4aMHR0%3D`;
export const clientIdLinkedIn = '78u11twz8d3kp5';
export const redirectUriLinkedIn = 'myapp://auth';
export const linkedinOAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientIdLinkedIn}&redirect_uri=myapp://auth&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
export const config: any = {
  issuer: 'https://login.microsoftonline.com/common',
  clientId: '96c6b43a-20aa-4f3c-9c08-0c83c63ce12c',
  redirectUrl:
    Platform.OS === 'ios'
      ? 'msauth.com.tinyaward.thinkingcap://auth/'
      : 'msauth.com.tinyaward.thinkingcap://authorize',
  scopes: ['openid', 'profile', 'email', 'User.Read'],
  additionalParameters: {prompt: 'consent'},
  serviceConfiguration: {
    authorizationEndpoint:
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    revocationEndpoint:
      'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
  },
};

const amazonConfig = {
  clientId: clientId,
  redirectUrl: redirectUri,
  scopes: ['profile'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.amazon.com/ap/oa',
    tokenEndpoint: 'https://api.amazon.com/auth/o2/token',
  },
};

export const configlogout: any = {
  issuer: 'https://login.microsoftonline.com/common',
  clientId: '96c6b43a-20aa-4f3c-9c08-0c83c63ce12c',
  endSessionEndpoint:
    'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
};
export const signInViaGoogle = async (dispatch: any) => {
  googleId();
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn().then(result => {
      dispatch(setUserData(result));
      dispatch(setLoginType(strings.signInGoogle));
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('User cancelled the login flow !');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('Google play services not available or outdated !');
    } else {
      console.log(error);
    }
  }
};

export const MicrosoftLogin = async (dispatch: any) => {
  try {
    const result = await authorize(config);
    const data: any = jwtDecode(result.accessToken);
    const image = await getUserPhotoUrl(result.accessToken);
    const userData = {
      data: {
        idToken: result.accessToken,
        user: {
          email: data?.upn,
          familyName: data?.family_name,
          givenName: data?.given_name,
          photo: image,
          fullName: data?.name,
          userId: data?.oid,
        },
      },
    };
    dispatch(setUserData(userData));
    dispatch(setLoginType(strings.signInMicroSoft));
  } catch (error) {
    console.log('errroe', error);
  }
};
export async function getUserPhotoUrl(accessToken) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);
  const options = {
    method: 'GET',
    headers: headers,
  };
  try {
    const response = await fetch(
      'https://graph.microsoft.com/v1.0/me/photo/$value',
      options,
    );
    if (!response.ok) {
      throw new Error(`Error fetching photo: ${response.statusText}`);
    }
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return null;
  }
}

export const googleId = () => {
  if (Platform.OS == 'ios') {
    GoogleSignin.configure({
      webClientId:
        '252818438060-in05f6agmp81al4jb8e35jmdq82f2a7q.apps.googleusercontent.com',
      offlineAccess: false,
      iosClientId:
        '252818438060-5iagv8dtjugss1orqsbfv8no3begqfqg.apps.googleusercontent.com',
    });
  } else {
    GoogleSignin.configure({
      webClientId:
        '252818438060-ci78rod5oj18cbt3k0a8qh10js01kbc4.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
};

export const loginWithAmazon = async () => {
  try {
    const result = await authorize(amazonConfig);
  } catch (error) {
    console.error(error.message, 'error occured');
  }
};
