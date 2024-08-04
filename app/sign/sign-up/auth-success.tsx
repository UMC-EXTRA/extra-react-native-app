import { BackHeaderContainer } from '@/components/Container';
import { Container } from '@/components/Container';
import { ConfirmButton } from '@/components/Theme/Button';
import { MainText } from '@/components/Theme/Text';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import { useAppSelector } from '@/redux/hooks';

const AuthSucessScreen = () => {
  const type = useAppSelector(state => state.signUp.type);

  return (
    <BackHeaderContainer>
      <Container style={{ paddingTop: getSize(219) }}>
        <MainText size={20} height={41}>
          본인 인증에 성공했어요!{'\n'} 이제 회원가입을 도와드릴게요.
        </MainText>
        <ConfirmButton
          style={{ marginTop: getSize(35) }}
          onPress={() => Router.push(`/sign/${type}/main-form`)}
          text="회원가입 하러가기"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default AuthSucessScreen;
