import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

import { Container } from '@/components/Container';
import { FormButton } from '@/components/Theme/Button';
import { MainText } from '@/components/Theme/Text';
import { Input, getRefInput, onFocusNext } from '@/components/Form';
import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isMemberSignUpState } from '@/redux/signUp/stateTypes';
import { setAccountData } from '@/redux/signUp/signUpSlice';

const AccountFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [complete, setComplete] = useState(false);

  const ref_input = getRefInput(3);
  const focusNext = (index: number) => {
    onFocusNext(ref_input, index);
  };

  useEffect(() => {
    if (isMemberSignUpState(signUp) && signUp.enteredAccount) {
      setBankName(signUp.account.bankName);
      setAccountNumber(signUp.account.accountNumber);
      setAccountHolder(signUp.account.accountHolder);
    }
  }, [signUp]);

  useEffect(() => {
    if (
      bankName.length > 0 &&
      accountNumber.length > 0 &&
      accountHolder.length > 0
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [bankName, accountNumber, accountHolder]);

  return (
    <BackHeaderContainer>
      <Container>
        <MainText style={{ ...styles.mainText, marginTop: getSize(46) }}>
          은행명
        </MainText>
        <Input
          style={{ marginBottom: 0 }}
          ref={ref_input[0]}
          value={bankName}
          onChangeText={setBankName}
          placeholder="은행명을 입력해주세요."
          onSubmitEditing={() => focusNext(0)}
        />
        <MainText style={styles.mainText}>계좌번호</MainText>
        <Input
          style={{ marginBottom: 0 }}
          ref={ref_input[1]}
          value={accountNumber}
          onChangeText={setAccountNumber}
          inputMode="numeric"
          placeholder="계좌번호를 -없이 입력해주세요."
          onSubmitEditing={() => focusNext(1)}
        />
        <MainText style={styles.mainText}>예금주</MainText>
        <Input
          style={{ marginBottom: 0 }}
          ref={ref_input[2]}
          value={accountHolder}
          onChangeText={setAccountHolder}
          placeholder="예금주명을 입력해주세요."
          onSubmitEditing={() => focusNext(2)}
        />
        <FormButton
          style={{ marginTop: getSize(264) }}
          valid={complete}
          text="완료"
          onPress={() => {
            dispatch(
              setAccountData({
                account: { bankName, accountNumber, accountHolder },
              }),
            );
            router.back();
          }}
        />
      </Container>
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
