import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';

const SignUpScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={styles.textBold}>어서오세요!</Text>
          {'\n'}
          먼저 <Text style={styles.textBold}>본인확인</Text>을 위해{' '}
          <Text style={styles.textBold}>휴대폰 본인인증</Text>을{'\n'}
          진행해주세요.
        </Text>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.confirmButton }}
          onPress={() => router.push('/member/sign-up/auth-success')}
        >
          <Text style={styles.buttonText}>본인 인증하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.cancelButton }}
          onPress={() => router.back()}
        >
          <Text style={{ ...styles.buttonText, color: '#adadad' }}>
            뒤로 가기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getSize(136),
    backgroundColor: '#000',
    alignItems: 'center',
  },
  text: {
    fontSize: getSize(20),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    lineHeight: getSize(41),
    fontWeight: '500',
  },
  textBold: {
    fontWeight: '900',
    fontFamily: 'Inter-ExtraBold',
  },
  button: {
    width: getSize(299),
    height: getSize(53),
    borderRadius: getSize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: colors.highlight,
    marginTop: getSize(57),
  },
  cancelButton: {
    backgroundColor: '#575757',
    marginTop: getSize(17),
  },
  buttonText: {
    height: getSize(24),
    lineHeight: getSize(24),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: '#000',
    fontSize: getSize(17),
  },
});

export default SignUpScreen;
