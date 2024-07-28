import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { Container } from '@/components/Container';
import { NextLinkButton } from '@/components/ButtonComponents';
import { MainText } from '@/components/TextComponents';
import getSize from '@/scripts/getSize';
import { useAppSelector } from '@/redux/hooks';

const AuthSucessScreen = () => {
  const type = useAppSelector(state => state.signUp.type);

  return (
    <BackHeaderContainer>
      <Container style={{ paddingTop: getSize(219) }}>
        <MainText>
          본인 인증에 성공했어요!{'\n'} 이제 회원가입을 도와드릴게요.
        </MainText>
        <NextLinkButton
          style={{ marginTop: getSize(35) }}
          onPress={() => router.push(`/auth/sign-up/${type}/main-form`)}
          text="회원가입 하러가기"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default AuthSucessScreen;
