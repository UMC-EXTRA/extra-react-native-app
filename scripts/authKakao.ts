import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login, logout } from '@react-native-kakao/user';

export const initKakao = () => {
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_APP_KEY}`);
};

export const loginKakao = async () => {
  const token = await login();
  console.log(token);
};

export const logoutKakao = () => {
  logout();
};
