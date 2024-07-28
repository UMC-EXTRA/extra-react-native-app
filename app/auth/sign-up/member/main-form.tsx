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

import { FormButton } from '@/components/ButtonComponents';
import { MainText, SubText } from '@/components/TextComponents';
import {
  Input,
  getRefInput,
  onFocusNext,
  InputStyle,
  InputTextStyle,
  SelectInput,
} from '@/components/InputComponents';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isMemberSignUpState } from '@/redux/signUp/stateTypes';
import { setBasicData } from '@/redux/signUp/signUpSlice';

const BasicFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState<null | boolean>(null);
  const [home, setHome] = useState('');
  const [complete, setComplete] = useState(false);

  const items = [
    { title: '여자', value: false },
    { title: '남자', value: true },
  ];

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const ref_input = getRefInput(6);
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
      isMemberSignUpState(signUp) &&
      home.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setComplete(checkComplete());
  }, [email, phone, name, birthday, sex, home]);

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
              <MainText
                style={{
                  marginTop: getSize(29),
                  textAlign: 'start',
                  width: getSize(368),
                }}
              >
                필수 정보를 입력해주세요.
              </MainText>
              <SubText style={{ marginTop: getSize(18) }}>
                일자리 신청에 꼭 필요한
              </SubText>
              <SubText
                style={{
                  marginTop: getSize(5),
                  marginBottom: getSize(39),
                }}
              >
                정보를 입력해주세요.
              </SubText>
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
              <Input
                placeholder="거주지를 입력해주세요."
                value={home}
                onChangeText={setHome}
                ref={ref_input[5]}
                onSubmitEditing={() => focusNext(5)}
                onFocus={() => adjustOffset(5)}
                style={{ marginBottom: 0 }}
              />
              <FormButton
                active={complete}
                onPress={() => {
                  if (checkComplete()) {
                    dispatch(
                      setBasicData({
                        email,
                        phone,
                        name,
                        sex,
                        birthday,
                        home,
                      }),
                    );
                    router.push('/auth/sign-up/member/additional-form');
                  }
                }}
                text="다음"
                style={{ marginTop: getSize(63), marginBottom: getSize(20) }}
              />
            </Container>
          </KeyboardAvoidingView>
        </ScrollView>
      </Pressable>
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
