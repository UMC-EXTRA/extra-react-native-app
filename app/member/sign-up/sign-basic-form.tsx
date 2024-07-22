import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import { Container } from '@/components/Container';
import { MainText, SubText, FormButton } from '@/components/FormComponents';
import {
  Input,
  getRefInput,
  onFocusNext,
  InputStyle,
  InputTextStyle,
} from '@/components/InputComponent';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import BackHeader from '@/components/BackHeader';

const BasicFormScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [valid, setValid] = useState(false);

  const items = [
    { title: '남자', value: 1 },
    { title: '여자', value: 2 },
  ];

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const ref_input: Array<React.RefObject<TextInput>> = getRefInput(6);
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
    if (
      email.length > 0 &&
      phone.length > 0 &&
      name.length > 0 &&
      birth.length &&
      gender.length > 0 &&
      address.length > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, phone, name, birth, gender, address]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <BackHeader />
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
                inputMode="tel"
                value={name}
                onChangeText={setName}
                ref={ref_input[2]}
                onSubmitEditing={() => focusNext(2)}
                onFocus={() => adjustOffset(2)}
              />
              <Input
                placeholder="생일을 입력해주세요. 예)19901010"
                inputMode="tel"
                keyboardType="number-pad"
                value={birth}
                onChangeText={setBirth}
                ref={ref_input[3]}
                onSubmitEditing={() => focusNext(3)}
                onFocus={() => adjustOffset(3)}
              />
              <SelectDropdown
                data={items}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem.value);
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
                value={address}
                onChangeText={setAddress}
                ref={ref_input[5]}
                onSubmitEditing={() => focusNext(5)}
                onFocus={() => adjustOffset(5)}
                style={{ marginBottom: 0 }}
              />
              <FormButton
                active={true}
                onPress={() => router.push('/member/sign-up/sign-body-form')}
                text="다음"
                style={{ marginTop: getSize(63), marginBottom: getSize(20) }}
              />
            </Container>
          </KeyboardAvoidingView>
        </ScrollView>
      </Pressable>
    </View>
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
