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
import { router } from 'expo-router';
import { useEffect, useState, useRef } from 'react';

import { SafeContainer } from '@/components/Container';
import { weight800, weight200, MainText } from '@/components/Theme/Text';
import { FormButton } from '@/components/Theme/Button';
import getSize from '@/scripts/getSize';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { initType } from '@/redux/signUp/signUpSlice';

/*
  Login page
  - Login with id and password
  - Social login buttons
*/
const LoginScreen = () => {
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

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

  // check if id and password are entered
  useEffect(() => {
    if (id.length > 0 && password.length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [id, password]);

  return (
    <SafeContainer style={{ alignItems: 'center' }}>
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
                returnKeyType="next"
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
                returnKeyType="done"
                ref={ref_input[1]}
                onSubmitEditing={() => {
                  onFocusNext(1);
                }}
              />
            </View>
            <FormButton
              width={100}
              height={104}
              radius={20}
              valid={valid}
              style={
                {
                  // backgroundColor: valid ? '#F5C001' : '#4B4B4B',
                }
              }
              text="로그인"
              textStyle={{
                ...weight800,
                fontSize: getSize(15),
                // color: valid ? '#000' : '#7D7D7D',
              }}
              onPress={() => {}}
            />
          </View>
          <View style={styles.navigationButtonContainer}>
            <TouchableOpacity onPress={() => router.push('/auth/find-id')}>
              <Text style={styles.navigationButtonText}>아이디 찾기</Text>
            </TouchableOpacity>
            <View style={styles.divisionBar} />
            <TouchableOpacity
              onPress={() => router.push('/auth/find-password')}
            >
              <Text style={styles.navigationButtonText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <View style={styles.divisionBar} />
            <TouchableOpacity
              onPress={() => {
                dispatch(initType(type));
                router.push('/auth/sign-up');
              }}
            >
              <Text style={styles.navigationButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <MainText
            size={18}
            style={{ marginTop: getSize(42), marginBottom: getSize(30) }}
          >
            간편 로그인
          </MainText>
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
    fontFamily: 'Inter-SemiBold',
    fontWeight: '700',
    color: '#fff',
    paddingLeft: getSize(14),
  },
  navigationButtonContainer: {
    marginTop: getSize(41),
    width: getSize(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationButtonText: {
    ...weight200,
    fontSize: getSize(13),
    color: '#969696',
  },
  divisionBar: {
    width: getSize(1),
    height: getSize(12),
    backgroundColor: '#969696',
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
    width: getSize(24),
    height: getSize(24),
  },
});

export default LoginScreen;
