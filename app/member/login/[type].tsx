import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import SafeContainer from '@/components/SafeContainer';
import getSize from '@/scripts/getSize';

/*
  Login page
  - Login with id and password
  - Social login buttons
*/
const LoginScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const navigation = useNavigation();

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };
  // user type (user, admin)
  const { type } = useLocalSearchParams();

  // hide header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // check if id and password are entered
  useEffect(() => {
    if (id.length > 0 && password.length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [id, password]);

  return (
    <SafeContainer>
      {/* hide keyboard when pressed */}
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.loginFormContainer}>
          <View style={styles.loginForm}>
            <View style={styles.loginInputContainer}>
              <TextInput
                style={styles.loginInput}
                value={id}
                onChangeText={setId}
                placeholder="아이디를 입력해주세요"
                placeholderTextColor={'#5E5E5E'}
                autoComplete="off"
                ref={ref_input[0]}
                onSubmitEditing={() => {
                  onFocusNext(0);
                }}
              />
              <TextInput
                style={styles.loginInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor={'#5E5E5E'}
                autoComplete="off"
                enterKeyHint="enter"
                ref={ref_input[1]}
                onSubmitEditing={() => {
                  onFocusNext(1);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.loginButton,
                backgroundColor: valid ? '#F5C001' : '#4B4B4B',
              }}
              disabled={!valid}
            >
              <Text
                style={{
                  ...styles.loginButtonText,
                  color: valid ? '#000' : '#7D7D7D',
                }}
              >
                로그인
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationButtonContainer}>
            <TouchableOpacity onPress={() => router.push('/member/find-id')}>
              <Text style={styles.navigationButtonText}>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={styles.divisionBar} />
            <TouchableOpacity
              onPress={() => router.push('/member/find-password')}
            >
              <Text style={styles.navigationButtonText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <View style={styles.divisionBar} />
            <TouchableOpacity onPress={() => router.push('/member/sign-up')}>
              <Text style={styles.navigationButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.socialLoginTitle}>간편 로그인</Text>
          <View style={styles.socialButtonContainer}>
            <TouchableOpacity
              onPress={() => alert('kakao')}
              style={{ ...styles.socialLoginButton, marginRight: 0 }}
            >
              <Image
                source={require('@/assets/images/icons/kakao.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 30,
    paddingTop: getSize(133),
  },
  logoImage: {
    width: getSize(124),
    height: getSize(124),
  },
  loginFormContainer: {
    flex: 70,
    alignItems: 'center',
  },
  loginForm: {
    width: getSize(390),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginInputContainer: {
    width: getSize(282),
    height: getSize(104),
    justifyContent: 'space-between',
  },
  loginInput: {
    width: '100%',
    height: getSize(46),
    borderRadius: getSize(20),
    borderColor: '#848484',
    borderStyle: 'solid',
    borderWidth: getSize(2),
    fontSize: getSize(15),
    fontWeight: 700,
    color: '#fff',
    paddingLeft: getSize(14),
  },
  loginButton: {
    width: getSize(100),
    height: getSize(104),
    borderRadius: getSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Inter',
    fontSize: getSize(15),
    fontWeight: 800,
  },
  navigationButtonContainer: {
    marginTop: getSize(41),
    width: getSize(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationButtonText: {
    fontFamily: 'Inter',
    fontSize: getSize(13),
    fontWeight: 200,
    color: '#969696',
  },
  divisionBar: {
    width: getSize(1),
    height: getSize(12),
    backgroundColor: '#969696',
  },
  socialLoginTitle: {
    marginTop: getSize(42),
    width: '100%',
    textAlign: 'center',
    fontSize: getSize(18),
    fontWeight: '900',
    fontFamily: 'Inter',
    color: '#fff',
    marginBottom: getSize(30),
  },
  socialButtonContainer: {
    width: '100%',
    height: getSize(58),
    flexDirection: 'row',
  },
  socialLoginButton: {
    width: getSize(58),
    height: getSize(58),
    borderRadius: getSize(29),
    backgroundColor: '#F5C001',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getSize(41),
  },
  iconImage: {
    width: getSize(25),
    height: getSize(26),
  },
});

export default LoginScreen;
