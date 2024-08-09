import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { FormButton } from '@/components/Theme/Button';
import { Input, FormMainText, SelectInput } from '@/components/Form';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import * as Permissions from '@/scripts/permission';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isCompanySignUpState } from '@/redux/signUp/stateTypes';
import { setBasicData } from '@/redux/signUp/signUpSlice';

type FormData = {
  email: string;
  password: string;
};

// Main form page for '업체' users
const BasicFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
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

  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  // Check complete
  useEffect(() => {
    if (isCompanySignUpState(signUp) && signUp.enteredCompany)
      setComplete(true);
    else {
      setComplete(false);
    }
  }, [signUp]);

  return (
    <BackHeaderContainer>
      {/* hide keyboard when pressed */}
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ flex: 1, alignItems: 'center' }}
      >
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
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
            name="password"
          />

          {/* link button to company form */}
          <SelectInput
            condition={isCompanySignUpState(signUp) && signUp.enteredCompany}
            value={
              isCompanySignUpState(signUp) && signUp.enteredCompany
                ? signUp.company
                : ''
            }
            placeholder="소속된 회사를 등록해주세요."
            onPress={() =>
              Router.push('/sign/sign-up/company/company-select-form')
            }
            style={{
              marginBotom: getSize(63),
            }}
          />

          {/* submit button */}
          <FormButton
            valid={isValid && complete}
            onPress={handleSubmit(data => {
              if (termComplete) {
                // save data
                dispatch(setBasicData(data));

                // request app permissions
                Permissions.requestLocationPermission().then(result => {
                  Permissions.requestPushNotificationPermission().then(
                    result => {
                      if (!result) {
                        Permissions.alertForOpeningSettings(
                          '푸시 알림 거부됨',
                          '푸시 알림을 받으려면 설정에서 알림을 허용해주세요.',
                        );
                      }
                      Router.push('/sign/sign-up/complete');
                    },
                  );
                });
              } else {
                // if checking terms is not completion, open term modal
                setDisplay(true);
              }
            })}
            text="다음"
          />
        </Container>
      </Pressable>
      {display && (
        <TermModal
          setDisplay={setDisplay}
          complete={termComplete}
          setComplete={setTermComplete}
        />
      )}
    </BackHeaderContainer>
  );
};

export default BasicFormScreen;
