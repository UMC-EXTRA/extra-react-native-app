import {
  View,
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Container } from '@/components/Container';
import { MainText, SubText, FormButton } from '@/components/FormComponents';
import { Input, InputStyle, InputTextStyle } from '@/components/InputComponent';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

const BodyFormScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [enteredTatto, setEnteredTatto] = useState(false);
  const [hasTatto, setHasTatto] = useState(false);
  const [tattos, setTattos] = useState({});
  const [enteredAccount, setEnteredAccount] = useState(false);
  const [account, setAccount] = useState({
    bank: '',
    bankName: '',
    number: '',
  });

  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
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
            placeholder="키를 입력해주세요."
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <Input
            placeholder="몸무게를 입력해주세요."
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <View
            style={{
              ...InputStyle,
              ...styles.selectInput,
            }}
          >
            <Text style={InputTextStyle}>
              {enteredTatto ? (
                hasTatto ? (
                  `문신 있음 ()`
                ) : (
                  `문신 없음`
                )
              ) : (
                <Text style={{ color: colors.placeholder }}>
                  문신 여부를 입력해주세요.
                </Text>
              )}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/member/sign-up/tatto-form')}
            >
              <AntDesign name="caretright" size={getSize(20)} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...InputStyle,
              ...styles.selectInput,
              marginBottom: getSize(41),
            }}
          >
            <Text style={InputTextStyle}>
              {enteredAccount ? (
                account.bankName + ' ' + account.number
              ) : (
                <Text style={{ color: colors.placeholder }}>
                  계좌번호를 입력해주세요.
                </Text>
              )}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/member/sign-up/account-form')}
            >
              <AntDesign name="caretright" size={getSize(20)} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              ...InputStyle,
              ...styles.termOpenButton,
            }}
          >
            <Text style={InputTextStyle}>약관 보기</Text>
          </TouchableOpacity>
          <FormButton
            active={true}
            onPress={() => console.log('next')}
            text="다음"
          />
        </Container>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termOpenButton: {
    borderColor: '#949494',
    borderWidth: getSize(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getSize(119),
  },
});

export default BodyFormScreen;
