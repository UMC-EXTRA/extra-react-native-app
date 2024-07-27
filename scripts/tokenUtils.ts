//import AsyncStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { isAxiosError } from 'axios';
import { router } from 'expo-router';

const URL = `${process.env.EXPO_PUBLIC_SERVER_URL}:${process.env.EXPO_PUBLIC_SERVER_PORT}`;

export async function getTokens(
  email: string,
  password: string,
  type: string,
): Promise<boolean> {
  try {
    const res = await axios.post(`${URL}/auth/login`, {
      email,
      password,
      type,
    });

    if (res.status === 200) {
      AsyncStorage.setItem(
        'Tokens',
        JSON.stringify({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          userId: res.data.userId,
          type: type,
        }),
      );
      return true;
    }

    if (res.status === 401) {
      return false;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('An unknown error occurred');
    }

    return false;
  }

  return false;
}

const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem('Tokens');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const verityToken = async () => {
  const Token = await getTokenFromLocal();

  // Connect first
  if (Token === null) {
    router.replace('/member');
  }
  // If the token is expired, refresh the token
  else {
    const headers_config = {
      refresh: Token.refreshToken,
      Authorization: `Bearer ${Token.accessToken}`,
    };

    try {
      const res = await axios.post(`${URL}/auth/refresh`, {
        headers: headers_config,
      });

      // If the access token is expired, refresh the token
      AsyncStorage.setItem(
        'Tokens',
        JSON.stringify({
          ...Token,
          accessToken: res.data.accessToken,
        }),
      );
    } catch (err) {
      if (isAxiosError(err)) {
        const code = err.response?.status;

        // If all tokens are expired, log out
        if (code === 401) {
          router.replace('/member');
        }
        // If all tokens are not expired, log in automatically
        else {
          router.replace(`/{Token.type}`);
        }
      }
    }
  }
};
