import { View } from 'react-native';
import { router } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';
import {
  MainText,
  MainLightText,
  NextLinkButton,
  BackLinkButton,
} from '@/components/FormComponents';
import { Container } from '@/components/Container';

const SignUpScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
      <Container style={{ paddingTop: getSize(136) }}>
        <MainLightText>
          <MainText>어서오세요!</MainText>
          {'\n'}
          먼저 <MainText>본인확인</MainText>을 위해{' '}
          <MainText>휴대폰 본인인증</MainText>을{'\n'}
          진행해주세요.
        </MainLightText>
        <NextLinkButton
          onPress={() => router.push('/member/sign-up/auth-success')}
          text="본인 인증하기"
          style={{ marginTop: getSize(57) }}
        />
        <BackLinkButton style={{ marginTop: getSize(17) }} />
      </Container>
    </View>
  );
};

export default SignUpScreen;
