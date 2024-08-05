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

const BasicFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

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

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const ref_input = getRefInput(4);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
    adjustOffset(index + 1);
  };

  const adjustOffset = (index: number) => {
    let offset = -getSize(150);
    offset += index * getSize(50);
    setKeyboardVerticalOffset(offset);

    // ScrollView를 조정된 위치로 스크롤
    scrollViewRef.current?.scrollTo({ y: offset, animated: true });
  };

  useEffect(() => {
    if (isCompanySignUpState(signUp) && signUp.enteredCompany)
      setComplete(true);
    else {
      setComplete(false);
    }
  }, [signUp]);

  return (
    <BackHeaderContainer>
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <KeyboardAvoidingView
            behavior="position"
            style={{ flex: 1 }}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <Container>
              <FormMainText />
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
              />
            </Container>
          </KeyboardAvoidingView>
        </ScrollView>
        <FormButton
          valid={isValid && complete}
          onPress={handleSubmit(data => {
            if (termComplete) {
              dispatch(setBasicData(data));
              Permissions.requestLocationPermission().then(result => {
                if (result) {
                  Permissions.requestPushNotificationPermission().then(
                    result => {
                      if (!result) {
                        Permissions.alertForOpeningSettings(
                          '푸시 알림 거부됨',
                          '푸시 알림을 받으려면 설정에서 알림을 허용해주세요.',
                        );
                      }
                      // getTokens(signUp.email, signUp.password, 'user').then(
                      //   result => {
                      //     if (result) {
                      //       router.push('/member/sign-up/complete');
                      //     }
                      //   },
                      // );
                      Router.push('/sign/sign-up/complete');
                    },
                  );
                }
              });
            } else {
              setDisplay(true);
            }
          })}
          text="다음"
          style={{
            position: 'absolute',
            bottom: getSize(49),
          }}
        />
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
