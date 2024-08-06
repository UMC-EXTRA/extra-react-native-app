import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Container } from '@/components/Container';
import { FormButton } from '@/components/Theme/Button';
import { BackHeaderContainer } from '@/components/Container';
import { GradientSelectInput } from '@/components/Form';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setTattoData } from '@/redux/signUp/signUpSlice';
import { TattoState } from '@/redux/signUp/stateTypes';
import { tattoNames, isMemberSignUpState } from '@/redux/signUp/stateTypes';

// Select tatto page
const TattoFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  // Initialize tatto data state
  const [hasTatto, setHasTatto] = useState<boolean>(false);
  const [tatto, setTatto] = useState<TattoState>({
    face: false,
    chest: false,
    arm: false,
    leg: false,
    shoulder: false,
    back: false,
    hand: false,
    feet: false,
    etc: false,
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
                etc: false,
              });
            }}
            placeholder="없음"
            style={{
              marginBottom: getSize(15),
            }}
          />
          {/* tatto buttons */}
          {Object.keys(tattoNames).map(key => (
            <GradientSelectInput
              key={key}
              value={hasTatto && tatto[key as keyof TattoState]}
              setValue={() => {
                const newTatto = { ...tatto };
                newTatto[key as keyof TattoState] =
                  !newTatto[key as keyof TattoState];
                setTatto(newTatto);
                setHasTatto(true);
              }}
              placeholder={tattoNames[key as keyof TattoState]}
              style={{
                marginBottom: getSize(15),
              }}
            />
          ))}
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
