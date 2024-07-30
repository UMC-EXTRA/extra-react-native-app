import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { SafeContainer } from '@/components/Container';
import { ConfirmButton } from '@/components/Theme/Button';
import { MainText } from '@/components/Theme/Text';
import getSize from '@/scripts/getSize';

import { initType } from '@/redux/profile/profileSlice';
import { useAppDispatch } from '@/redux/hooks';
/*
  App first page
  - Select user type
*/
const MemberScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeContainer style={{ alignItems: 'center' }}>
      <View style={styles.mainTextContainer}>
        <MainText size={29} height={41}>
          어서오세요!{'\n'}원하시는 서비스를 선택해주세요
        </MainText>
      </View>
      <View style={styles.linkContainer}>
        <ConfirmButton
          onPress={() => {
            dispatch(initType('member'));
            router.push('/auth/login');
          }}
          style={{ marginBottom: getSize(20) }}
          text="보조출연자"
        />
        <ConfirmButton
          onPress={() => {
            dispatch(initType('company'));
            router.push('/auth/login');
          }}
          text="관리자"
        />
        <ConfirmButton
          style={{ marginTop: getSize(20) }}
          onPress={() => router.replace('/member')}
          text="보조출연자 홈화면"
        />
        <ConfirmButton
          style={{ marginTop: getSize(20) }}
          onPress={() => router.replace('/company')}
          text="관리자 홈화면"
        />
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  mainTextContainer: {
    flex: 24,
    justifyContent: 'flex-end',
  },
  linkContainer: {
    flex: 76,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MemberScreen;
