import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
// import * as SecureStore from 'expo-secure-store';

export const storeToken = async (
  accessToken: string,
  refreshToken?: string,
) => {
  try {
    //await SecureStore.setItemAsync('accessToken', token);
    await AsyncStorage.setItem(
      'Token',
      JSON.stringify({
        accessToken,
        refreshToken: refreshToken || '',
      }),
    );
  } catch (err) {
    console.error('Failed to save the token to SecureStore', err);
  }
};

export const getToken = async () => {
  try {
    //const token = await SecureStore.getItemAsync('accesToken');
    const tokens = await AsyncStorage.getItem('Token');
    if (tokens !== null) {
      return JSON.parse(tokens);
    } else {
      return null;
    }
  } catch (err) {
    console.error('Failed to save the token to SecureStore', err);
  }
};

export const requestFetchWithOutToken = async (
  url: string,
  method: string,
  data: object,
  option?: object,
) => {
  const headers_config = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  const requestHeaders: HeadersInit = new Headers();
  const config = option || headers_config;

  Object.entries(config).map(([key, value]) => {
    requestHeaders.set(key, value);
  });

  return await fetch(url, {
    method,
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
};

export const requestFetch = async (
  url: string,
  method: string,
  data?: object,
  option?: object,
) => {
  const Token = await getToken();

  if (Token !== null) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.accessToken}`);
    if (option) {
      Object.entries(option).map(([key, value]) => {
        requestHeaders.set(key, value);
      });
    }

    if (data) {
      return await fetch(url, {
        method,
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
    } else {
      return await fetch(url, {
        method,
        headers: requestHeaders,
      });
    }
  }

  return null;
};

export const encryptAccessToken = (accessToken: string) => {
  const secretKey = `${process.env.EXPO_PUBLIC_SECRET_KEY}`;
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(
    accessToken,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    },
  );

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    encryptedData: encrypted.toString(),
  };
};

export const createHmacSignature = (data: string) => {
  const secretKey = `${process.env.EXPO_PUBLIC_SECRET_KEY}`;
  return CryptoJS.HmacSHA256(data, secretKey).toString();
};
