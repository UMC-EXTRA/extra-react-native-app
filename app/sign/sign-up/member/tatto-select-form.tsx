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
  setTattooData,
  isMemberSignUpState,
  tattooNames,
} from '@/redux/slice/signUpSlice';
import type { TattooInterface } from '@/api/interface';

// Select tattoo page
const tattooFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  // Initialize tattoo data state
  const [hasTattoo, setHasTattoo] = useState<boolean>(false);
  const [tattoo, setTattoo] = useState<TattooInterface>({
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

  // Load previously saved tattoo data
  useEffect(() => {
    if (isMemberSignUpState(signUp) && signUp.enteredTattoo) {
      setComplete(true);
      setHasTattoo(signUp.hasTattoo);
      setTattoo(signUp.tattoo);
    }
  }, [signUp]);

  // Check complete
  useEffect(() => {
    if (Object.values(tattoo).filter(value => value).length > 0 || !hasTattoo) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [hasTattoo, tattoo]);

  /**
   * Check if tattoos is selected
   * if tattoo is selected, hastattoo is true
   */
  useEffect(() => {
    if (Object.values(tattoo).filter(value => value).length > 0) {
      setHasTattoo(true);
    } else {
      setHasTattoo(false);
    }
  }, [tattoo]);

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
          {/* tattoo buttons */}
          {Object.keys(tattoo).map(key => {
            const typedKey = key as keyof TattooInterface;
            return (
              <GradientSelectInput
                key={typedKey}
                value={Boolean(tattoo[typedKey])}
                setValue={() => {
                  const newTattoo = { ...tattoo };
                  newTattoo[typedKey] = !newTattoo[typedKey];
                  setTattoo(newTattoo);
                  setHasTattoo(true);
                }}
                placeholder={tattooNames[typedKey]}
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
              value={!hasTattoo}
              setValue={() => {
                setHasTattoo(!hasTattoo);
                setTattoo({
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
            dispatch(setTattooData({ hasTattoo, tattoo }));
            Router.back();
          }}
          text="다음"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default tattooFormScreen;
