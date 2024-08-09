import { Platform } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { useEffect } from 'react';

import { SafeContainer } from '@/components/Container';
import { TextWeight900 } from '@/components/Theme/Text';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { resetState } from '@/redux/slice/signUpSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

const Complete = () => {
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // auto login
    // getTokens(signUp.email, signUp.password, 'user').then(
    //   result => {
    //     if (result) {
    //       router.push('/member/sign-up/complete');
    //     }
    //   },
    // );
    // run action after 2 secends
    setTimeout(() => {
      // reset sign up data
      dispatch(resetState());
      // move to main page
      Router.replace(`/${type}`);
    }, 2000);
  }, []);

  return (
    <SafeContainer
      style={{
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {Platform.OS === 'ios' ? (
        <Svg width="430" height="883" viewBox="0 0 430 1100" fill="none">
          <Path d="M215 -14V785H-107L215 -14Z" fill="#F5C001" />
          <Path d="M215 -14V785H537L215 -14Z" fill="#F5C001" />
          <Path
            d="M512 785.5C512 831.616 379.252 869 215.5 869C51.7476 869 -81 831.616 -81 785.5C-81 739.384 51.7476 702 215.5 702C379.252 702 512 739.384 512 785.5Z"
            fill="#F5C001"
          />
        </Svg>
      ) : (
        <Svg width="430" height="883" viewBox="0 0 430 1200" fill="none">
          <Path d="M215 -14V785H-107L215 -14Z" fill="#F5C001" />
          <Path d="M215 -14V785H537L215 -14Z" fill="#F5C001" />
          <Path
            d="M512 785.5C512 831.616 379.252 869 215.5 869C51.7476 869 -81 831.616 -81 785.5C-81 739.384 51.7476 702 215.5 702C379.252 702 512 739.384 512 785.5Z"
            fill="#F5C001"
          />
        </Svg>
      )}
      <TextWeight900
        align="center"
        size={30}
        height={35}
        style={{
          color: '#000',
          position: 'absolute',
          top: Platform.OS === 'ios' ? getSize(400) : getSize(450),
        }}
      >
        회원가입이 완료되었어요!{'\n\n'}이제 EXTRA와 함께{'\n'}
        {type === 'member' && '배우'}
        {type === 'company' && '감독'}님이 되어보세요 🤩
      </TextWeight900>
      <Svg
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? getSize(100) : getSize(40),
        }}
        width="600"
        height="300"
        viewBox="0 0 600 300"
      >
        <Ellipse cx="300" cy="150" rx="245" ry="83.5" fill="#FFDF6A" />
      </Svg>
    </SafeContainer>
  );
};

export default Complete;
