import { Alert } from 'react-native';
import {
  MemberSignUpInterface,
  SignUpInterface,
  LoginInterface,
} from './interface';
import { Router } from '@/scripts/router';

import * as Utils from './utils';

const ACCOUNT_API_URL = 'account';
const MEMBER_API_URL = 'members';
const COMPANY_API_URL = 'companies';
const KAKAO_API_URL = 'oauth/';

type AccountInterface = {
  id: number;
};

export async function signUpAccount(
  data: LoginInterface,
  type: string,
): Promise<AccountInterface | null> {
  try {
    const res = await Utils.requestFetchWithOutToken(
      `${ACCOUNT_API_URL}/signup`,
      'POST',
      {
        ...data,
        userRole: type === 'member' ? 'USER' : 'COMPANY',
      },
    );

    if (res.status === 201) {
      return res.json();
    } else if (res.status === 400) {
      const message = '이미 존재하는 유저입니다.';
      Alert.alert('이메일 중복', message);
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

// 보초출연자 회원가입
export async function signUpMember(
  data: MemberSignUpInterface,
): Promise<boolean> {
  try {
    const res = await Utils.requestFetchWithOutToken(
      MEMBER_API_URL + '/signup',
      'POST',
      data,
    );

    if (res.status === 201) {
      return true;
    } else if (res.status === 400) {
      const message = '이미 존재하는 유저입니다.';
      Alert.alert('이메일 중복', message, [
        { text: '확인', onPress: () => Router.back() },
      ]);
      return false;
    } else {
      const error = await res.json();
      throw new Error(error.message || 'An error occurred');
    }
  } catch (err) {
    console.error(err);
  }

  return false;
}

// 업체 회원가입
export async function signUpCompany(data: SignUpInterface): Promise<boolean> {
  try {
    const res = await Utils.requestFetchWithOutToken(
      COMPANY_API_URL + '/signup',
      'POST',
      data,
    );

    if (res.status === 201) {
      return true;
    } else if (res.status === 400) {
      const message = '이미 존재하는 유저입니다.';
      Alert.alert('이메일 중복', message);
      return false;
    } else {
      const error = await res.json();
      throw new Error(error.message || 'An error occurred');
    }
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
    const res = await Utils.requestFetchWithOutToken(
      `${type === 'member' ? MEMBER_API_URL : COMPANY_API_URL}` + '/login',
      'POST',
      {
        ...data,
        userRole: type === 'member' ? 'USER' : 'COMPANY',
      },
    );

    if (res.status === 200) {
      const token = res.headers.get('authorization');
      if (token && token.startsWith('Bearer ')) {
        const accesToken = token.slice(7);

        Utils.storeToken(accesToken);
      }

      return true;
    }

    if (res.status === 404) {
      Alert.alert(
        '이메일 오류',
        '찾을 수 없는 이메일 입니다. 다시 입력해주세요',
      );
    }

    if (res.status === 400) {
      Alert.alert(
        '비밀번호 오류',
        '비밀번호가 일치하지 않습니다. 다시 입력해주세요',
      );
    }

    return false;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function logout(type: string) {
  try {
    const res = await Utils.requestFetch(
      `${type === 'member' ? MEMBER_API_URL : COMPANY_API_URL}` + '/logout',
      'POST',
    );

    if (res !== null) {
      if (res.status === 200) {
        Alert.alert('로그아웃 완료', '로그아웃 되었습니다.');
      }

      if (res.status === 403) {
        Alert.alert('로그인 필요', '만료되었습니다. 다시 로그인해주세요');
      }
    } else {
      Alert.alert('로그인 필요', '로그인 후 가능합니다.');
    }
  } catch (err) {
    console.error(err);
  }

  Router.replace('/sign');
}

interface MemberProfileInterface {
  name: string;
  sex: boolean;
  birthday: string;
  home: string;
  introduction: string;
  license: string;
  pros: string;
  height: number;
  weight: number;
  face: boolean;
  back: boolean;
  arm: boolean;
  leg: boolean;
  hand: boolean;
  shoulder: boolean;
  chest: boolean;
  feet: boolean;
}

export async function getMemberProfile(): Promise<MemberProfileInterface | null> {
  try {
    const res = await Utils.requestGetFetch(MEMBER_API_URL);

    if (res !== null) {
      if (res.status === 200) {
        return res.json();
      } else {
        Alert.alert('로그인 필요', '만료되었습니다. 다시 로그인해주세요', [
          { text: '확인', onPress: () => Router.replace('/sign') },
        ]);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}

interface CompanyProfileResponse {
  name: string;
  url: string;
}

export async function getCompanyProfile(): Promise<CompanyProfileResponse | null> {
  try {
    const res = await Utils.requestGetFetch(COMPANY_API_URL);

    if (res !== null) {
      if (res.status === 200) {
        return res.json();
      } else {
        Alert.alert('로그인 필요', '만료되었습니다. 다시 로그인해주세요', [
          { text: '확인', onPress: () => Router.replace('/sign') },
        ]);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}

interface AuthorizationInterface {
  url?: string;
}

export const getRedirectURI =
  async (): Promise<AuthorizationInterface | null> => {
    try {
      const res = await Utils.requestFetchWithOutToken(
        KAKAO_API_URL + 'authorize',
        'GET',
      );

      if (res.status === 200) {
        return res.json();
      }
    } catch (err) {
      console.error(err);
    }

    return null;
  };

type KakaoLoginInterface = {
  id?: number;
};

export const kakaoLogin = async (
  code: string,
  type: string,
): Promise<KakaoLoginInterface | null> => {
  const params = {
    code: code,
  };

  const query = new URLSearchParams(params).toString();
  const requrl = KAKAO_API_URL + 'kakao?' + query;

  try {
    const res = await Utils.requestFetchWithOutToken(requrl, 'POST', {
      userRole: type === 'member' ? 'USER' : 'COMPANY',
    });

    if (res.status === 200) {
      const accessToken = await res.headers.get('authorization');
      if (accessToken && accessToken.startsWith('Bearer ')) {
        Utils.storeToken(accessToken.slice(7));
      }
      return {};
    }
    if (res.status === 201) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};
