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
import { FormMainText } from '@/components/Form';
import { FormButton } from '@/components/Theme/Button';
import {
  Input,
  InputStyle,
  InputTextStyle,
  SelectInput,
} from '@/components/Form';
import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import type { TattoState } from '@/redux/signUp/stateTypes';
import { tattoNames, isMemberSignUpState } from '@/redux/signUp/stateTypes';
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
      isMemberSignUpState(signUp) &&
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
          <FormMainText />
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
            condition={isMemberSignUpState(signUp) && signUp.enteredTatto}
            value={
              isMemberSignUpState(signUp) &&
              signUp.enteredTatto &&
              signUp.hasTatto
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
            onPress={() =>
              router.push('/auth/sign-up/member/tatto-select-form')
            }
          />
          <SelectInput
            condition={isMemberSignUpState(signUp) && signUp.enteredAccount}
            value={
              isMemberSignUpState(signUp) && signUp.enteredAccount
                ? `${signUp.account.bankName + ' ' + signUp.account.accountNumber}`
                : ''
            }
            placeholder="계좌번호를 입력해주세요."
            onPress={() => router.push('/auth/sign-up/member/account-form')}
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
            valid={complete}
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
                    router.push('/auth/sign-up/complete');
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
  termOpenButton: {
    borderColor: '#949494',
    borderWidth: getSize(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getSize(119),
  },
});

export default PhysicalFormScreen;
