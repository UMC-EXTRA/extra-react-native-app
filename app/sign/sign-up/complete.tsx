import { useEffect } from 'react';
import { Image } from 'expo-image';

import { SafeContainer } from '@/components/Container';
import { TextWeight900 } from '@/components/Theme/Text';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { resetState } from '@/redux/slice/signUpSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { login } from '@/api/signController';
import { initEmail } from '@/redux/slice/profileSlice';

const Complete = () => {
  const signUp = useAppSelector(state => state.signUp);
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // auto login
    const data = {
      email: signUp.email,
      password: signUp.password,
    };
    login(data, type).then(res => {
      if (res) {
        // save email
        dispatch(initEmail(signUp.email));

        // reset sign up data
        dispatch(resetState());

        // run action after 2 secends
        setTimeout(() => {
          // move to main page
          Router.replace(`/${type}`);
        }, 2000);
      }
    });
  }, []);

  return (
    <SafeContainer
      style={{
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Image
        source={require('@/assets/images/complete.jpeg')}
        style={{
          width: getSize(430),
          height: getSize(867),
          position: 'absolute',
          bottom: getSize(51),
        }}
      />
      <TextWeight900
        align="center"
        size={30}
        height={35}
        style={{
          color: '#000',
          position: 'absolute',
          bottom: getSize(365),
        }}
      >
        회원가입이 완료되었어요!{'\n\n'}이제 EXTRA와 함께{'\n'}
        {type === 'member' && '배우'}
        {type === 'company' && '감독'}님이 되어보세요 🤩
      </TextWeight900>
    </SafeContainer>
  );
};

export default Complete;
