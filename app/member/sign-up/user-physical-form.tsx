import {
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { Container } from '@/components/Container';
import { MainText, SubText } from '@/components/TextComponents';
import { FormButton } from '@/components/ButtonComponents';
import {
  Input,
  InputStyle,
  InputTextStyle,
  SelectInput,
} from '@/components/InputComponents';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import type { TattoState } from '@/redux/signUp/stateTypes';
import { tattoNames, isUserState } from '@/redux/signUp/stateTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPhysicalData } from '@/redux/signUp/signUpSlice';

import * as Permissions from '@/scripts/permission';

import { getTokens } from '@/scripts/tokenUtils';

const PhysicalFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (
      isUserState(signUp) &&
      height.length > 0 &&
      weight.length > 0 &&
      signUp.enteredTatto &&
      signUp.enteredAccount &&
      termComplete
    )
      setComplete(true);
    else setComplete(false);
  }, [height, weight, signUp, termComplete]);

  return (
    <BackHeaderContainer>
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
          <SelectInput
            condition={isUserState(signUp) && signUp.enteredTatto}
            value={
              isUserState(signUp) && signUp.enteredTatto && signUp.hasTatto
                ? `문신 있음 (${Object.entries(tattoNames)
                    .filter(
                      ([key, value]) =>
                        signUp.tatto && signUp.tatto[key as keyof TattoState],
                    )
                    .map(([, value]) => value)
                    .join(', ')})`
                : `문신 없음`
            }
            placeholder="문신 여부를 입력해주세요."
            onPress={() => router.push('/member/sign-up/tatto-form')}
          />
          <SelectInput
            condition={isUserState(signUp) && signUp.enteredAccount}
            value={
              isUserState(signUp) && signUp.enteredAccount
                ? `${signUp.account.bankName + ' ' + signUp.account.accountNumber}`
                : ''
            }
            placeholder="계좌번호를 입력해주세요."
            onPress={() => router.push('/member/sign-up/account-form')}
            style={{ marginBottom: getSize(41) }}
          />
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
              dispatch(
                setPhysicalData({
                  height: Number(height),
                  weight: Number(weight),
                }),
              );
              Permissions.requestLocationPermission().then(result => {
                if (result) {
                  Permissions.requestCameraPermission().then(result => {
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
                    router.push('/member/sign-up/complete');
                  });
                }
              });
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
    </BackHeaderContainer>
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
