import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login, logout } from '@react-native-kakao/user';
import { Router } from './router';

export const initKakao = () => {
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_APP_KEY}`);
};

export const loginKakao = async () => {
  const token = await login();
  console.log(token);
  Router.replace('/member');
};

export const logoutKakao = () => {
  logout();
};
