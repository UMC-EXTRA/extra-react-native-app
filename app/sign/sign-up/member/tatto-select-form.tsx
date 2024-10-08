import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Container } from '@/components/Container';
import { FormButton } from '@/components/Theme/Button';
import { BackHeaderContainer } from '@/components/Container';
import { GradientSelectInput } from '@/components/Form';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setTattoData,
  isMemberSignUpState,
  tattoNames,
} from '@/redux/slice/signUpSlice';
import type { MemberTattoInterface } from '@/api/interface';

// Select tatto page
const TattoFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  // Initialize tatto data state
  const [hasTatto, setHasTatto] = useState<boolean>(false);
  const [tatto, setTatto] = useState<MemberTattoInterface>({
    face: false,
    chest: false,
    arm: false,
    leg: false,
    shoulder: false,
    back: false,
    hand: false,
    feet: false,
  });
  const [complete, setComplete] = useState(false);

  // Load previously saved tatto data
  useEffect(() => {
    if (isMemberSignUpState(signUp) && signUp.enteredTatto) {
      setComplete(true);
      setHasTatto(signUp.hasTatto);
      setTatto(signUp.tatto);
    }
  }, [signUp]);

  // Check complete
  useEffect(() => {
    if (Object.values(tatto).filter(value => value).length > 0 || !hasTatto) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [hasTatto, tatto]);

  /**
   * Check if tattos is selected
   * if tatto is selected, hasTatto is true
   */
  useEffect(() => {
    if (Object.values(tatto).filter(value => value).length > 0) {
      setHasTatto(true);
    } else {
      setHasTatto(false);
    }
  }, [tatto]);

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
          {/* tatto buttons */}
          {Object.keys(tatto).map(key => {
            const typedKey = key as keyof MemberTattoInterface;
            return (
              <GradientSelectInput
                key={typedKey}
                value={Boolean(tatto[typedKey])}
                setValue={() => {
                  const newTatto = { ...tatto };
                  newTatto[typedKey] = !newTatto[typedKey];
                  setTatto(newTatto);
                  setHasTatto(true);
                }}
                placeholder={tattoNames[typedKey]}
                style={{
                  marginBottom: getSize(15),
                }}
              />
            );
          })}

          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* '없음' button */}
            <GradientSelectInput
              value={!hasTatto}
              setValue={() => {
                setHasTatto(!hasTatto);
                setTatto({
                  face: false,
                  chest: false,
                  arm: false,
                  leg: false,
                  shoulder: false,
                  back: false,
                  hand: false,
                  feet: false,
                });
              }}
              placeholder="없음"
            />
          </View>
        </View>
        {/* submit button */}
        <FormButton
          valid={complete}
          style={{ marginTop: getSize(88), marginBottom: getSize(49) }}
          onPress={() => {
            dispatch(setTattoData({ hasTatto, tatto }));
            Router.back();
          }}
          text="다음"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default TattoFormScreen;
