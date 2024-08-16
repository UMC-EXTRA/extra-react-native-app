import { Pressable, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';

import { FormButton } from '@/components/Theme/Button';
import { FormMainText, SelectInput } from '@/components/Form';
import { Container } from '@/components/Container';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import TermModal from '@/components/TermModal';

import * as Permissions from '@/scripts/permission';

import { useAppSelector } from '@/redux/hooks';
import { isCompanySignUpState } from '@/redux/slice/signUpSlice';
import { signUpCompany } from '@/api/signController';

// Main form page for '업체' users
const BasicFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);

  const [display, setDisplay] = useState(false);
  const [termComplete, setTermComplete] = useState(false);
  const [complete, setComplete] = useState(false);

  // Check complete
  useEffect(() => {
    if (isCompanySignUpState(signUp) && signUp.enteredName) setComplete(true);
    else {
      setComplete(false);
    }
  }, [signUp]);

  return (
    <BackHeaderContainer>
      {/* hide keyboard when pressed */}
      <Pressable
        onPress={Keyboard.dismiss}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <Container>
          <FormMainText />

          {/* link button to company form */}
          <SelectInput
            condition={isCompanySignUpState(signUp) && signUp.enteredName}
            value={
              isCompanySignUpState(signUp) && signUp.enteredName
                ? signUp.name
                : ''
            }
            placeholder="소속된 회사를 등록해주세요."
            onPress={() =>
              Router.push('/sign/sign-up/company/company-select-form')
            }
            style={{
              marginBottom: getSize(305),
            }}
          />

          {/* submit button */}
          <FormButton
            valid={complete}
            onPress={() => {
              if (termComplete) {
                signUpCompany({
                  accountId: signUp.accountId,
                  name: signUp.name,
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
              } else {
                // if checking terms is not completion, open term modal
                setDisplay(true);
              }
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

export default BasicFormScreen;
