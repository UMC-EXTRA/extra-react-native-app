import axios from 'axios';
import {
  MemberSignUpInterface,
  SignUpInterface,
  LoginInterface,
} from './interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Router } from '@/scripts/router';

const SERVER_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}`;
const API_URL = SERVER_URL + '/api/v1/';
const MEMBER_API_URL = API_URL + 'members';
const COMPANY_API_URL = API_URL + 'companies';

// 보초출연자 회원가입
export async function signUpMember(
  data: MemberSignUpInterface,
): Promise<boolean> {
  try {
    const res = await fetch(MEMBER_API_URL + '/signup', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(res);
    return true;
  } catch (err) {
    console.error(err);
  }

  return false;
}

// 업체 회원가입
export async function signUpCompany(data: SignUpInterface): Promise<boolean> {
  try {
    const res = await axios.post(COMPANY_API_URL + '/signup', {
      data,
    });

    console.log(res);

    return true;
  } catch (err) {
    console.error(err);
  }

  return false;
}

// 로그인
export async function login(
  data: LoginInterface,
  type: string,
): Promise<boolean> {
  try {
    const res = await axios.post(
      `${type === 'member' ? MEMBER_API_URL : COMPANY_API_URL}` + '/login',
      data,
    );

    console.log(res);
    if (res.status === 200) {
      AsyncStorage.setItem(
        'Tokens',
        JSON.stringify({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }),
      );

      return true;
    }

    if (res.status === 401) {
      return false;
    }
  } catch (err) {
    console.error(err);
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

export async function logout() {
  const Token = await getTokenFromLocal();

  if (Token !== null) {
    try {
      const res = await axios.post(MEMBER_API_URL + '/logout', {
        headers: {
          Authorization: `Bearer ${Token.accessToken}`,
        },
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  Router.replace('/sign');
}
