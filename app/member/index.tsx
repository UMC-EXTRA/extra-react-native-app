import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import { NextLinkButton } from '@/components/ButtonComponents';
import { MainText } from '@/components/TextComponents';
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
        <MainText style={{ fontSize: getSize(29) }}>
          어서오세요!{'\n'}원하시는 서비스를 선택해주세요
        </MainText>
      </View>
      <View style={styles.linkContainer}>
        <NextLinkButton
          onPress={() => {
            dispatch(initType('user'));
            router.push('/member/login');
          }}
          style={{ marginBottom: getSize(20) }}
          text="보조출연자"
        />
        <NextLinkButton
          onPress={() => {
            dispatch(initType('admin'));
            router.push('/member/login');
          }}
          text="관리자"
        />
        <NextLinkButton
          style={{ marginTop: getSize(20) }}
          onPress={() => router.replace('/user')}
          text="보조출연자 홈화면"
        />
        <NextLinkButton
          style={{ marginTop: getSize(20) }}
          onPress={() => router.replace('/admin')}
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
