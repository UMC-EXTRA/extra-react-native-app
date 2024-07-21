import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

const AuthSucessScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.mainText}>
          본인 인증에 성공했어요!{'\n'} 이제 회원가입을 도와드릴게요.
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push('/member/sign-up/sign-basic-form')}
        >
          <Text style={styles.buttonText}>회원가입 하러가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getSize(219),
    backgroundColor: '#000',
    alignItems: 'center',
  },
  mainText: {
    color: '#fff',
    fontSize: getSize(20),
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '900',
    lineHeight: getSize(41),
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: colors.highlight,
    marginTop: getSize(35),
    justifyContent: 'center',
    alignItems: 'center',
    width: getSize(299),
    height: getSize(53),
    borderRadius: getSize(18),
  },
  buttonText: {
    color: '#000',
    fontSize: getSize(17),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
});

export default AuthSucessScreen;
