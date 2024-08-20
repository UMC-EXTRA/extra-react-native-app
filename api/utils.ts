import { hmacSHA256 } from 'react-native-hmac';
import CryptoJS from 'react-native-crypto-js';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const SERVER_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}`;
const API_URL = SERVER_URL + '/api/v1/';

export const storeToken = async (accessToken: string) => {
  try {
    const expiresIn = 3600;
    const expiryTime = Date.now() + expiresIn * 1000;
    await SecureStore.setItemAsync(
      'Token',
      JSON.stringify({
        accessToken,
        expiryTime,
      }),
    );
  } catch (err) {
    console.error('Failed to save the token to SecureStore', err);
  }
};

export const getToken = async () => {
  try {
    //const token = await SecureStore.getItemAsync('accesToken');
    const tokens = await SecureStore.getItemAsync('Token');
    if (tokens !== null) {
      return JSON.parse(tokens);
    }
  } catch (err) {
    console.error('Failed to save the token to SecureStore', err);
  }

  return null;
};

export const useTokenRefresh = () => {
  useEffect(() => {
    const checkTokenExpiry = async () => {
      const tokenData = await getToken();

      if (tokenData !== null) {
        const { expiryTime } = tokenData;
        const timeLeft = expiryTime - Date.now();

        // 50분이 지나면 (10분 남았을 때) 리프레시
        if (timeLeft <= 10 * 60 * 1000) {
          await refreshAccessToken();
        } else {
          // 남은 시간만큼 타이머 설정
          setTimeout(checkTokenExpiry, timeLeft - 10 * 60 * 1000);
        }
      }
    };

    const refreshAccessToken = async () => {
      try {
        // 리프레시 토큰을 사용해 새 액세스 토큰을 가져옴
        const tokenData = await getToken();
        if (tokenData?.refreshToken) {
          const res = await requestGetFetch('token');

          if (res !== null) {
            if (res.status === 200) {
              const token = res.headers.get('authorization');
              if (token && token.startsWith('Bearer ')) {
                const accesToken = token.slice(7);

                await storeToken(accesToken);
              }
            } else {
              // 리프레시 실패 시 로그아웃 처리 등 추가 로직
              console.error('Failed to refresh token');
            }
          }
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    checkTokenExpiry();
  }, []);
};

export const requestFetchWithOutToken = async (
  url: string,
  method: string,
  data?: object,
  option?: object,
): Promise<any> => {
  const headers_config = {
    Accept: '*/*',
  };

  const requestHeaders: HeadersInit = new Headers();
  const config = option || headers_config;

  Object.entries(config).map(([key, value]) => {
    requestHeaders.set(key, value);
  });

  const URL = API_URL + url;

  if (data) {
    requestHeaders.set('Content-Type', 'application/json');
    return await fetch(URL, {
      method,
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
  } else {
    return await fetch(URL, {
      method,
      headers: requestHeaders,
    });
  }
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
    requestHeaders.set('Accept', '*/*');
    if (option) {
      Object.entries(option).map(([key, value]) => {
        requestHeaders.set(key, value);
      });
    }

    const URL = API_URL + url;

    if (data) {
      return await fetch(URL, {
        method,
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
    } else {
      return await fetch(URL, {
        method,
        headers: requestHeaders,
      });
    }
  }

  return null;
};

export const requestPostFetch = async (url: string, data: object) => {
  return await requestFetch(url, 'POST', data, {
    'Content-Type': 'application/json',
  });
};

export const requestPutFetch = async (url: string, data: object) => {
  return await requestFetch(url, 'PUT', data, {
    'Content-Type': 'application/json',
  });
};

export const requestGetFetch = async (url: string) => {
  return await requestFetch(url, 'GET');
};

export const requestDeleteFetch = async (url: string) => {
  return await requestFetch(url, 'DELETE');
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

export const createHmacSignature = async (data: string) => {
  const secretKey = `${process.env.EXPO_PUBLIC_SECRET_KEY}`;
  const signature = await hmacSHA256(data, secretKey);
  return signature;
};
