import {
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import type { TattoState } from '@/redux/signUp/stateTypes';
import { tattoNames, isMemberSignUpState } from '@/redux/signUp/stateTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPhysicalData } from '@/redux/signUp/signUpSlice';

import * as Permissions from '@/scripts/permission';

import { getTokens } from '@/scripts/tokenUtils';

type FormData = {
  height: number;
  weight: number;
};

const PhysicalFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      height: 0,
      weight: 0,
    },
  });

  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (
      isMemberSignUpState(signUp) &&
      signUp.enteredTatto &&
      signUp.enteredAccount &&
      termComplete
    )
      setComplete(true);
    else setComplete(false);
  }, [signUp, termComplete]);

  return (
    <BackHeaderContainer>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Container>
          <FormMainText />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[0-9]+\.?[0-9]+$/,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="키를 입력해주세요."
                value={String(`${value === 0 ? '' : value}`)}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
            name="height"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[0-9]+\.?[0-9]+$/,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="몸무게를 입력해주세요."
                value={String(`${value === 0 ? '' : value}`)}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
            name="weight"
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
              Router.push('/sign/sign-up/member/tatto-select-form')
            }
          />
          <SelectInput
            condition={isMemberSignUpState(signUp) && signUp.enteredAccount}
            value={
              isMemberSignUpState(signUp) && signUp.enteredAccount
                ? `${signUp.account.bankName} ${signUp.account.accountNumber} (${signUp.account.accountHolder})`
                : ''
            }
            placeholder="계좌번호를 입력해주세요."
            onPress={() => Router.push('/sign/sign-up/member/account-form')}
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
            valid={complete && isValid}
            onPress={handleSubmit(data => {
              dispatch(setPhysicalData(data));
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
            })}
            text="다음"
            style={{
              position: 'absolute',
              bottom: getSize(49),
            }}
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
