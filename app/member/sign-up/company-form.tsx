import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Container } from '@/components/Container';
import { FormButton } from '@/components/ButtonComponents';

import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { GradientSelectInput } from '@/components/InputComponents';
import getSize from '@/scripts/getSize';

import { setCompanyData } from '@/redux/signUp/signUpSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isAdminState } from '@/redux/signUp/stateTypes';

const TattoFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [companyList, setCompanyList] = useState<string[]>([]);
  const [company, setCompany] = useState('');

  useEffect(() => {
    setCompanyList(['A', 'B', 'C', 'D']);
  }, []);

  useEffect(() => {
    if (isAdminState(signUp) && signUp.enteredCompany) {
      setCompany(signUp.company);
    }
  }, [signUp]);

  return (
    <BackHeaderContainer>
      <Container>
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: getSize(35),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {companyList.map(key => (
            <GradientSelectInput
              key={key}
              value={company === key}
              setValue={() => {
                setCompany(company === key ? '' : key);
              }}
              placeholder={key}
              style={{
                marginBottom: getSize(15),
              }}
            />
          ))}
        </View>
        <FormButton
          active={company.length > 0}
          style={{ marginTop: getSize(88), marginBottom: getSize(49) }}
          onPress={() => {
            dispatch(setCompanyData({ company }));
            router.back();
          }}
          text="다음"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default TattoFormScreen;
