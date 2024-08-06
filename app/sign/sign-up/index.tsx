import { BackHeaderContainer } from '@/components/Container';
import { MainText, TextWeight500 } from '@/components/Theme/Text';
import { ConfirmButton, BackLinkButton } from '@/components/Theme/Button';
import { Container } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { useAppDispatch } from '@/redux/hooks';
import { resetState } from '@/redux/signUp/signUpSlice';

// identity verification page
const SignUpScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <BackHeaderContainer>
      <Container style={{ paddingTop: getSize(136) }}>
        <TextWeight500 align="center" height={41} size={20}>
          <MainText>어서오세요!</MainText>
          {'\n'}
          먼저 <MainText>본인확인</MainText>을 위해{' '}
          <MainText>휴대폰 본인인증</MainText>을{'\n'}
          진행해주세요.
        </TextWeight500>
        {/* identity verification button */}
        <ConfirmButton
          onPress={() => Router.push('/sign/sign-up/auth-success')}
          text="본인 인증하기"
          style={{ marginTop: getSize(57) }}
        />
        {/* back button */}
        <BackLinkButton
          style={{ marginTop: getSize(17) }}
          onPress={() => {
            dispatch(resetState());
            Router.back();
          }}
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default SignUpScreen;
