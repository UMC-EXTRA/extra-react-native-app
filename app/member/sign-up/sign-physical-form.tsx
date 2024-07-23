import {
  View,
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Container } from '@/components/Container';
import { MainText, SubText, FormButton } from '@/components/FormComponents';
import {
  Input,
  InputStyle,
  InputTextStyle,
} from '@/components/InputComponents';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';
import TermModal from '@/components/TermModal';

import type { TattoState, AccountState, TermState } from '@/redux/stateTypes';
import tattoNames from '@/redux/stateTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initTerms, setPhysicalData } from '@/redux/signUpSlice';

const PhysicalFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    dispatch(
      initTerms({
        terms: [
          {
            id: 1,
            title: '이용약관 동의',
            content: '내용내용내용내용내용내용내용내용',
            agree: false,
            optional: false,
          },
          {
            id: 2,
            title: '개인정보 수집 및 이용 동의',
            content: '내용내용내용내용내용내용내용내용',
            agree: false,
            optional: false,
          },
          {
            id: 3,
            title: '위치정보 이용 동의',
            content: '내용내용내용내용내용내용내용내용',
            agree: false,
            optional: false,
          },
          {
            id: 4,
            title: '개인정보 유효기간 탈퇴 시로 지정',
            content: '내용내용내용내용내용내용내용내용',
            agree: false,
            optional: true,
          },
          {
            id: 5,
            title: '홍보성 정보 메일, SMS 수신동의',
            content: '내용내용내용내용내용내용내용내용',
            agree: false,
            optional: true,
          },
        ],
      }),
    );
  }, []);

  useEffect(() => {
    if (
      height.length > 0 &&
      weight.length > 0 &&
      signUp.enteredTatto &&
      signUp.enteredAccount &&
      termComplete
    )
      setComplete(true);
    else setComplete(false);
  }, [
    height,
    weight,
    signUp.enteredTatto,
    signUp.enteredAccount,
    termComplete,
  ]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
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
              {signUp.enteredTatto ? (
                signUp.hasTatto ? (
                  `문신 있음 (${Object.entries(tattoNames)
                    .filter(
                      ([key, value]) =>
                        signUp.tatto && signUp.tatto[key as keyof TattoState],
                    )
                    .map(([, value]) => value)
                    .join(', ')})`
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
              {signUp.enteredAccount ? (
                signUp.account.bankName + ' ' + signUp.account.accountNumber
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
            onPress={() => setDisplay(true)}
          >
            <Text style={InputTextStyle}>약관 보기</Text>
          </TouchableOpacity>
          <FormButton
            active={complete}
            onPress={() => {
              dispatch(setPhysicalData({ height, weight }));
              router.push('/member/sign-up/complete');
            }}
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

export default PhysicalFormScreen;
