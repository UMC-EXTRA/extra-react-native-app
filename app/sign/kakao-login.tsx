import { WebView, WebViewNavigation } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

import { SafeContainer } from '@/components/Container';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setAccountId } from '@/redux/slice/signUpSlice';
import { kakaoLogin } from '@/api/signController';
import { Router } from '@/scripts/router';
import { useState } from 'react';

const KakaoLoginScreen = () => {
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();
  const { uri } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const seperator = '/oauth/callback/kakao?code=';

  const handleNavigationChange = async (navState: WebViewNavigation) => {
    if (isLoading) return;

    // 현재 URL을 상태에 저장
    const url = navState.url;
    if (url.includes(seperator)) {
      setIsLoading(true);
      const code = url.split(seperator)[1];
      await kakaoLogin(code, type).then(res => {
        if (res !== null) {
          if (res.id) {
            dispatch(setAccountId(res.id));
            Router.replace(`/sign/sign-up/${type}/main-form`);
          } else {
            Router.replace(`/${type}`);
          }
        }
      });
    }
  };

  return (
    <SafeContainer>
      <WebView
        source={{ uri: `${uri}` }}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeContainer>
  );
};

export default KakaoLoginScreen;
