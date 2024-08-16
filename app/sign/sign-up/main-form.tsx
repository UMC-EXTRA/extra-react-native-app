import { Pressable, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { FormButton } from '@/components/Theme/Button';
import {
  Input,
  getRefInput,
  onFocusNext,
  FormMainText,
} from '@/components/Form';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setAccountId } from '@/redux/slice/signUpSlice';
import { signUpAccount } from '@/api/signController';
import { initEmail } from '@/redux/slice/profileSlice';

type FormData = {
  email: string;
  password: string;
};

// Main form page for '보조출연자' users
const MainFormScreen = () => {
  const type = useAppSelector(state => state.signUp.type);
  const dispatch = useAppDispatch();

  // Initialize form data
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Initialize ref for auto-focus
  const ref_input = getRefInput(5);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
  };

  return (
    <BackHeaderContainer>
      {/* hide keyboard when pressed */}
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Container>
          <FormMainText />

          {/* email input */}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="이메일을 입력해주세요."
                inputMode="email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={() => focusNext(0)}
                ref={ref_input[0]}
                style={{
                  marginBottom: getSize(9),
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
              <Input
                placeholder="비밀번호을 입력해주세요."
                value={value}
                onChangeText={onChange}
                onSubmitEditing={() => focusNext(1)}
                ref={ref_input[1]}
                secureTextEntry
                style={{
                  marginBottom: getSize(396),
                }}
              />
            )}
            name="password"
          />

          {/* submit button */}
          <FormButton
            valid={isValid}
            onPress={handleSubmit(data => {
              // save email and password
              signUpAccount(data, type).then(res => {
                if (res !== null) {
                  dispatch(setAccountId(res.id));

                  dispatch(initEmail(data.email));

                  // move to info form
                  Router.push(`/sign/sign-up/${type}/main-form`);
                }
              });
            })}
            text="다음"
          />
        </Container>
      </Pressable>
    </BackHeaderContainer>
  );
};

export default MainFormScreen;
