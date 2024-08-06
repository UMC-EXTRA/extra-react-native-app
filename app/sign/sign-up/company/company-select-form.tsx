import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

import { FormButton } from '@/components/Theme/Button';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import { GradientSelectInput } from '@/components/Form';
import getSize from '@/scripts/getSize';

import { setCompanyData } from '@/redux/signUp/signUpSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isCompanySignUpState } from '@/redux/signUp/stateTypes';

const TattoFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [companyList, setCompanyList] = useState<string[]>([]);
  const [company, setCompany] = useState('');

  // Initialize company list
  useEffect(() => {
    setCompanyList(['A', 'B', 'C', 'D']);
  }, []);

  // load previously saved data
  useEffect(() => {
    if (isCompanySignUpState(signUp) && signUp.enteredCompany) {
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
          {/* company list */}
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

        {/* submit button */}
        <FormButton
          valid={company.length > 0}
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
