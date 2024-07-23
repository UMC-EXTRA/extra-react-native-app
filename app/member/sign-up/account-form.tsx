import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

import { Container } from '@/components/Container';
import { FormButton, MainText } from '@/components/FormComponents';
import { Input, getRefInput, onFocusNext } from '@/components/InputComponents';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import getSize from '@/scripts/getSize';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAccountData } from '@/redux/signUpSlice';

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
    if (signUp.enteredAccount && signUp.account) {
      setBankName(signUp.account.bankName);
      setAccountNumber(signUp.account.accountNumber);
      setAccountHolder(signUp.account.accountHolder);
    }
  }, [signUp.enteredAccount, signUp.account]);

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
          active={complete}
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
  },
});

export default AccountFormScreen;
