import { useState, useRef } from 'react';
import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { FormButton } from '@/components/Theme/Button';
import {
  Input,
  getRefInput,
  onFocusNext,
  SelectBox,
  FormMainText,
} from '@/components/Form';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { useAppDispatch } from '@/redux/hooks';
import { setBasicData } from '@/redux/signUp/signUpSlice';

type FormData = {
  email: string;
  phone: string;
  name: string;
  birthday: string;
  sex: number;
  home: string;
};

// Main form page for '보조출연자' users
const MainFormScreen = () => {
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
      home: '',
    },
  });

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

  return (
    <BackHeaderContainer>
      {/* hide keyboard when pressed */}
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
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

              {/* home address input */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="거주지를 입력해주세요."
                    value={value}
                    onChangeText={onChange}
                    style={{
                      marginBottom: getSize(63),
                    }}
                  />
                )}
                name="home"
              />

              {/* submit button */}
              <FormButton
                valid={isValid}
                onPress={handleSubmit(data => {
                  // save basic data
                  dispatch(setBasicData(data));
                  // move to additional form
                  Router.push('/sign/sign-up/member/additional-form');
                })}
                text="다음"
              />
            </Container>
          </KeyboardAvoidingView>
        </ScrollView>
      </Pressable>
    </BackHeaderContainer>
  );
};

export default MainFormScreen;
