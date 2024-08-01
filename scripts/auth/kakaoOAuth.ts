import { initializeKakaoSDK } from '@react-native-kakao/core';
import { login, logout } from '@react-native-kakao/user';

const initKakao = () => {
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_APP_KEY}`);
};

const signInWithKakao = async (): Promise<void> => {
  try {
    const response = await login();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const signOutWithKakao = async (): Promise<void> => {
  try {
    const response = await logout();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export { initKakao, signInWithKakao };
