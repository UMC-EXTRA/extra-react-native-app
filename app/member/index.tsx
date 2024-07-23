import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import { MainText, NextLinkButton } from '@/components/FormComponents';
import getSize from '@/scripts/getSize';

/*
  App first page
  - Select user type
*/
const MemberScreen = () => {
  return (
    <SafeContainer>
      <View style={styles.mainTextContainer}>
        <MainText style={{ fontSize: getSize(29) }}>
          어서오세요!{'\n'}원하시는 서비스를 선택해주세요
        </MainText>
      </View>
      <View style={styles.linkContainer}>
        <NextLinkButton
          onPress={() =>
            router.push({
              pathname: '/member/login/[type]',
              params: { type: 'user' },
            })
          }
          style={{ marginBottom: getSize(20) }}
          text="보조출연자"
        />
        <NextLinkButton
          onPress={() =>
            router.push({
              pathname: '/member/login/[type]',
              params: { type: 'admin' },
            })
          }
          text="관리자"
        />
        <NextLinkButton
          style={{ marginTop: getSize(20) }}
          onPress={() => router.replace('/home')}
          text="홈화면"
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
