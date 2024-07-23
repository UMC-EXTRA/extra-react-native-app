import { View } from 'react-native';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { Container } from '@/components/Container';
import { MainText, NextLinkButton } from '@/components/FormComponents';
import getSize from '@/scripts/getSize';

const AuthSucessScreen = () => {
  return (
    <BackHeaderContainer>
      <Container style={{ paddingTop: getSize(219) }}>
        <MainText>
          본인 인증에 성공했어요!{'\n'} 이제 회원가입을 도와드릴게요.
        </MainText>
        <NextLinkButton
          style={{ marginTop: getSize(35) }}
          onPress={() => router.push('/member/sign-up/sign-basic-form')}
          text="회원가입 하러가기"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default AuthSucessScreen;
