import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { FormButton } from '@/components/Theme/Button';
import {
  Input,
  getRefInput,
  onFocusNext,
  SelectBox,
  FormMainText,
  SelectInput,
} from '@/components/Form';
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
  phone: string;
  name: string;
  birthday: string;
  sex: number;
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
      phone: '',
      name: '',
      birthday: '',
      sex: 0,
    },
  });

  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  // Auto-scroll when keyboard is visible
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize ref for auto-focus
  const ref_input = getRefInput(4);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
    adjustOffset(index + 1);
  };

  // Auto-scroll method
  const adjustOffset = (index: number) => {
    let offset = -getSize(150);
    offset += index * getSize(50);
    setKeyboardVerticalOffset(offset);

    // ScrollView to the adjusted position
    scrollViewRef.current?.scrollTo({ y: offset, animated: true });
  };

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
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* container avoiding keyboard */}
          <KeyboardAvoidingView
            behavior="position"
            style={{ flex: 1 }}
            keyboardVerticalOffset={keyboardVerticalOffset}
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
                    onSubmitEditing={() => focusNext(0)}
                    onFocus={() => adjustOffset(0)}
                    ref={ref_input[0]}
                  />
                )}
                name="email"
              />

              {/* phone number input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^0\d{1,2}\d{3,4}\d{4}$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="전화번호를 입력해주세요."
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={() => focusNext(1)}
                    onFocus={() => adjustOffset(1)}
                    ref={ref_input[1]}
                  />
                )}
                name="phone"
              />

              {/* name input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="이름 입력해주세요."
                    value={value}
                    onChangeText={onChange}
                    ref={ref_input[2]}
                    onSubmitEditing={() => focusNext(2)}
                    onFocus={() => adjustOffset(2)}
                  />
                )}
                name="name"
              />

              {/* birthday input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="생일을 입력해주세요. 예)19901010"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                    ref={ref_input[3]}
                    onSubmitEditing={() => focusNext(3)}
                    onFocus={() => adjustOffset(3)}
                  />
                )}
                name="birthday"
              />

              {/* sex selectbox */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange } }) => (
                  <SelectBox
                    onChange={onChange}
                    items={[
                      { title: '남자', value: 1 },
                      { title: '여자', value: 2 },
                    ]}
                    placeholder="성별을 선택해주세요."
                  />
                )}
                name="sex"
              />

              {/* link button to company form */}
              <SelectInput
                condition={
                  isCompanySignUpState(signUp) && signUp.enteredCompany
                }
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
          </KeyboardAvoidingView>
        </ScrollView>
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
