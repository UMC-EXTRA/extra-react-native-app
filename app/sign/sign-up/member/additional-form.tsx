import { useEffect, useState } from 'react';
import { Pressable, Keyboard, Text, TouchableOpacity } from 'react-native';
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

import type { TattooInterface } from '@/api/interface';
import { isMemberSignUpState, tattooNames } from '@/redux/slice/signUpSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPhysicalData } from '@/redux/slice/signUpSlice';

import * as Permissions from '@/scripts/permission';
import { signUpMember } from '@/api/signController';

type FormData = {
  height: number;
  weight: number;
};

const AdditionalFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  // Initialize form data
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

  // Check complete
  useEffect(() => {
    if (
      isMemberSignUpState(signUp) &&
      signUp.enteredTattoo &&
      signUp.enteredAccount &&
      termComplete
    )
      setComplete(true);
    else setComplete(false);
  }, [signUp, termComplete]);

  return (
    <BackHeaderContainer>
      {/* hide keyboard when pressed */}
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Container>
          <FormMainText />

          {/* height input */}
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

          {/* weight input */}
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

          {/* link button to tatto form */}
          <SelectInput
            condition={isMemberSignUpState(signUp) && signUp.enteredTattoo}
            value={
              isMemberSignUpState(signUp) &&
              signUp.enteredTattoo &&
              signUp.hasTattoo
                ? `문신 있음 (${Object.entries(tattooNames)
                    .filter(
                      ([key, value]) =>
                        signUp.tattoo &&
                        signUp.tattoo[key as keyof TattooInterface],
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

          {/* link button to account form */}
          <SelectInput
            condition={isMemberSignUpState(signUp) && signUp.enteredAccount}
            value={
              isMemberSignUpState(signUp) && signUp.enteredAccount
                ? `${signUp.bank} ${signUp.accountNumber}`
                : ''
            }
            placeholder="계좌번호를 입력해주세요."
            onPress={() => Router.push('/sign/sign-up/member/account-form')}
            style={{ marginBottom: getSize(41) }}
          />

          {/* button opening term modal */}
          <TouchableOpacity
            style={{
              ...InputStyle,
              borderColor: '#949494',
              borderWidth: getSize(3),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: getSize(119),
            }}
            onPress={() => setDisplay(true)}
          >
            <Text style={InputTextStyle}>약관 보기</Text>
          </TouchableOpacity>

          {/* submit button */}
          <FormButton
            valid={complete && isValid}
            onPress={handleSubmit(data => {
              // save physical data
              dispatch(setPhysicalData(data));

              if (isMemberSignUpState(signUp)) {
                signUpMember({
                  accountId: signUp.accountId,
                  phone: signUp.phone,
                  name: signUp.name,
                  birthday: signUp.birthday.replace(
                    /(\d{4})(\d{2})(\d{2})/g,
                    '$1-$2-$3',
                  ),
                  sex: signUp.sex,
                  home: signUp.home,
                  height: Number(data.height),
                  weight: Number(data.weight),
                  bank: signUp.bank,
                  accountNumber: signUp.accountNumber,
                  tattoo: signUp.tattoo,
                }).then(res => {
                  if (res) {
                    // request app permissions
                    Permissions.requestLocationPermission().then(result => {
                      Permissions.requestPushNotificationPermission().then(
                        result => {
                          if (!result) {
                            Permissions.alertForOpeningSettings(
                              '푸시 알림 거부됨',
                              '푸시 알림을 받으려면 설정에서 알림을 허용해주세요.',
                            );
                          }
                          Router.push('/sign/sign-up/complete');
                        },
                      );
                    });
                  }
                });
              }
            })}
            text="다음"
          />
        </Container>
      </Pressable>

      {/* term modal */}
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

export default AdditionalFormScreen;
