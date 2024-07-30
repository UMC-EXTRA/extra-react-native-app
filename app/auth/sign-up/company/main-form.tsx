import {
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';

import { FormButton } from '@/components/Theme/Button';
import { FormMainText } from '@/components/Form';
import {
  Input,
  getRefInput,
  onFocusNext,
  InputStyle,
  InputTextStyle,
  SelectInput,
} from '@/components/Form';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isCompanySignUpState } from '@/redux/signUp/stateTypes';
import { setBasicData } from '@/redux/signUp/signUpSlice';

const BasicFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState<null | boolean>(null);
  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  const items = [
    { title: '여자', value: false },
    { title: '남자', value: true },
  ];

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

  const checkValidation = () => {
    return true;
  };

  const checkComplete = () => {
    if (
      email.length > 0 &&
      phone.length > 0 &&
      name.length > 0 &&
      birthday.length &&
      sex != null &&
      isCompanySignUpState(signUp) &&
      signUp.enteredCompany
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setComplete(checkComplete());
  }, [email, phone, name, birthday, sex, signUp]);

  return (
    <BackHeaderContainer>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
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
              <Input
                placeholder="이메일을 입력해주세요."
                inputMode="email"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => focusNext(0)}
                onFocus={() => adjustOffset(0)}
                ref={ref_input[0]}
              />
              <Input
                placeholder="전화번호를 입력해주세요."
                inputMode="tel"
                value={phone}
                onChangeText={setPhone}
                onSubmitEditing={() => focusNext(1)}
                onFocus={() => adjustOffset(1)}
                ref={ref_input[1]}
              />
              <Input
                placeholder="이름을 입력해주세요."
                value={name}
                onChangeText={setName}
                ref={ref_input[2]}
                onSubmitEditing={() => focusNext(2)}
                onFocus={() => adjustOffset(2)}
              />
              <Input
                placeholder="생일을 입력해주세요. 예)19901010"
                keyboardType="number-pad"
                value={birthday}
                onChangeText={setBirthday}
                ref={ref_input[3]}
                onSubmitEditing={() => focusNext(3)}
                onFocus={() => adjustOffset(3)}
              />
              <SelectDropdown
                data={items}
                onSelect={(selectedItem, index) => {
                  setSex(selectedItem.value);
                }}
                renderButton={(selectedItem, isOpened) => (
                  <View style={{ ...InputStyle, justifyContent: 'center' }}>
                    <Text style={InputTextStyle}>
                      {(selectedItem && selectedItem.title) || (
                        <Text style={{ color: colors.placeholder }}>
                          "성별을 선택해주세요."
                        </Text>
                      )}
                    </Text>
                  </View>
                )}
                renderItem={(item, index, isSelected) => (
                  <View
                    style={{
                      ...styles.dropDownItem,
                      ...(isSelected && { backgroundColor: '#111' }),
                    }}
                  >
                    <Text style={InputTextStyle}>{item.title}</Text>
                  </View>
                )}
                dropdownStyle={{
                  borderRadius: getSize(15),
                  backgroundColor: colors.headerBackground,
                }}
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
                  router.push('/auth/sign-up/company/company-select-form')
                }
                style={{ marginBottom: 0 }}
              />
              <FormButton
                valid={complete}
                onPress={() => {
                  if (termComplete) {
                    dispatch(
                      setBasicData({ email, phone, name, sex, birthday }),
                    );
                    router.push('/auth/sign-up/complete');
                  } else {
                    setDisplay(true);
                  }
                }}
                text="다음"
                style={{ marginTop: getSize(63), marginBottom: getSize(20) }}
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

const styles = StyleSheet.create({
  dropDownItem: {
    width: '100%',
    height: getSize(59),
    paddingLeft: getSize(26),
    justifyContent: 'center',
  },
});

export default BasicFormScreen;
