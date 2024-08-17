import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useForm, Controller } from 'react-hook-form';

import { weight800, weight200, MainText } from '@/components/Theme/Text';
import { FormButton } from '@/components/Theme/Button';
import { SafeContainer } from '@/components/Container';
import { getRefInput, onFocusNext } from '@/components/Form';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import type { LoginInterface } from '@/api/interface';
import { login, getRedirectURI, kakaoLogin } from '@/api/signController';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { initType } from '@/redux/slice/signUpSlice';
import { initEmail } from '@/redux/slice/profileSlice';

// login page
const LoginScreen = () => {
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();

  // Initialize form data
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInterface>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const ref_input = getRefInput(2);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
  };
  return (
    <SafeContainer>
      {/* hide keyboard when pressed */}
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {/* logo image */}
        <View
          style={{
            height: getSize(338),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={{
              width: getSize(124),
              height: getSize(124),
            }}
          />
        </View>

        {/* main content */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          {/* login form */}
          <View
            style={{
              width: getSize(390),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {/* textInputs */}
            <View
              style={{
                width: getSize(282),
                height: getSize(104),
                justifyContent: 'space-between',
              }}
            >
              {/* id input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.loginInput}
                    value={value}
                    onChangeText={onChange}
                    placeholder="이메일를 입력해주세요"
                    placeholderTextColor={'#5E5E5E'}
                    autoComplete="off"
                    returnKeyType="next"
                    ref={ref_input[0]}
                    onSubmitEditing={() => {
                      focusNext(0);
                    }}
                  />
                )}
                name="email"
              />
              {/* password input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.loginInput}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor={'#5E5E5E'}
                    autoComplete="off"
                    returnKeyType="done"
                    ref={ref_input[1]}
                    onSubmitEditing={() => {
                      focusNext(1);
                    }}
                  />
                )}
                name="password"
              />
            </View>

            {/* submit button */}
            <FormButton
              width={100}
              height={104}
              radius={20}
              valid={isValid}
              style={{
                backgroundColor: isValid ? '#F5C001' : '#4B4B4B',
              }}
              text="로그인"
              textStyle={{
                ...weight800,
                fontSize: getSize(15),
                color: isValid ? '#000' : '#7D7D7D',
              }}
              onPress={handleSubmit(data => {
                login(data)
                  .then(res => {
                    if (res) {
                      Alert.alert('로그인 성공', '로그인 되었습니다.', [
                        {
                          text: '확인',
                          onPress: () => {
                            dispatch(initEmail(data.email));
                            Router.replace(`/${type}`);
                          },
                        },
                      ]);
                    }
                  })
                  .catch(err => {
                    console.error(err);
                  });
              })}
            />
          </View>

          {/* link buttons */}
          <View
            style={{
              marginTop: getSize(41),
              width: getSize(180),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* link to find-password page */}
            <TouchableOpacity
              onPress={() => Router.push('/sign/find-password')}
            >
              <Text style={styles.navigationButtonText}>비밀번호 찾기</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* link to sign-up page */}
            <TouchableOpacity
              onPress={() => {
                dispatch(initType({ type }));
                Router.push('/sign/sign-up');
              }}
            >
              <Text style={styles.navigationButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>

          {/* social login buttons */}
          <MainText
            size={18}
            style={{ marginTop: getSize(42), marginBottom: getSize(30) }}
          >
            간편 로그인
          </MainText>
          <View
            style={{
              width: '100%',
              height: getSize(58),
              flexDirection: 'row',
            }}
          >
            {/* kakao login */}
            <TouchableOpacity
              onPress={() => {
                getRedirectURI().then(async res => {
                  if (res !== null) {
                    if (res.url) {
                      Router.push({
                        pathname: '/sign/kakao-login',
                        params: {
                          uri: res.url,
                        },
                      });
                    } else {
                      Router.replace(`/${type}`);
                    }
                  }
                });
              }}
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
  navigationButtonText: {
    ...weight200,
    fontSize: getSize(13),
    color: '#969696',
  },
  divider: {
    width: getSize(1),
    height: getSize(12),
    backgroundColor: '#969696',
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
