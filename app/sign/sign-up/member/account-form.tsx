import { StyleSheet, Pressable, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import { Container } from '@/components/Container';
import { FormButton } from '@/components/Theme/Button';
import { MainText } from '@/components/Theme/Text';
import { Input, getRefInput, onFocusNext } from '@/components/Form';
import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setAccountData } from '@/redux/slice/signUpSlice';

type FormData = {
  bank: string;
  accountNumber: string;
};

const AccountFormScreen = () => {
  const name = useAppSelector(state => state.signUp.name);
  const dispatch = useAppDispatch();

  // Initialize form data
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      bank: '',
      accountNumber: '',
    },
  });

  // Initialize ref for auto-focus
  const ref_input = getRefInput(3);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
  };

  return (
    <BackHeaderContainer>
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <Container>
          {/* bank name input */}
          <MainText style={{ ...styles.mainText, marginTop: getSize(46) }}>
            은행명
          </MainText>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                style={{ marginBottom: 0 }}
                ref={ref_input[0]}
                value={value}
                onChangeText={onChange}
                placeholder="은행명을 입력해주세요."
                onSubmitEditing={() => focusNext(0)}
              />
            )}
            name="bank"
          />

          {/* account number input */}
          <MainText style={styles.mainText}>계좌번호</MainText>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="계좌번호를 -없이 입력해주세요."
                inputMode="numeric"
                ref={ref_input[1]}
                onSubmitEditing={() => focusNext(1)}
                style={{ marginBottom: 0 }}
              />
            )}
            name="accountNumber"
          />

          {/* account holder input */}
          <MainText style={styles.mainText}>예금주</MainText>
          <Input
            value={''}
            editable={false}
            onChangeText={() => {}}
            placeholder={name}
            style={{
              marginBottom: getSize(264),
              backgroundColor: '#222',
            }}
          />

          {/* submit button */}
          <FormButton
            valid={isValid}
            text="완료"
            onPress={handleSubmit(data => {
              dispatch(setAccountData(data));
              router.back();
            })}
          />
        </Container>
      </Pressable>
    </BackHeaderContainer>
  );
};

const styles = StyleSheet.create({
  mainText: {
    marginTop: getSize(16),
    marginBottom: getSize(11),
    width: getSize(368),
    textAlign: 'left',
    lineHeight: getSize(41),
  },
});

export default AccountFormScreen;
