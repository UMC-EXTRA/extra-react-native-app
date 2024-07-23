import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Container } from '@/components/Container';
import { FormButton, MainText } from '@/components/FormComponents';
import colors from '@/constants/Colors';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import getSize from '@/scripts/getSize';

import { setTattoData } from '@/redux/signUpSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TattoState } from '@/redux/stateTypes';
import tattoNames from '@/redux/stateTypes';

interface SelectInputProps {
  value: boolean;
  setValue: () => void;
  placeholder: string;
}
const SelectInput = ({ value, setValue, placeholder }: SelectInputProps) => {
  const selectInputStyles = StyleSheet.create({
    selectInput: {
      width: getSize(176),
      height: getSize(98),
      borderRadius: getSize(13),
    },
    linearGradient: {
      flex: 1,
      borderRadius: getSize(13),
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: getSize(10),
      backgroundColor: '#000',
      margin: 3,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => setValue()}
      style={{
        ...selectInputStyles.selectInput,
        ...(!value && { backgroundColor: '#656565' }),
      }}
    >
      {value ? (
        <LinearGradient
          colors={['#fff', colors.highlight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={selectInputStyles.linearGradient}
        >
          <View style={selectInputStyles.textContainer}>
            <MainText>{placeholder}</MainText>
          </View>
        </LinearGradient>
      ) : (
        <View style={selectInputStyles.textContainer}>
          <MainText>{placeholder}</MainText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const TattoFormScreen = () => {
  const signUp = useAppSelector(state => state.signUp);
  const dispatch = useAppDispatch();

  const [hasTatto, setHasTatto] = useState<Boolean>(false);
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

  useEffect(() => {
    if (signUp.enteredTatto) {
      setComplete(true);
      setHasTatto(signUp.hasTatto);
      setTatto(signUp.tatto);
    }
  }, [signUp.enteredTatto, signUp.hasTatto, signUp.tatto]);

  useEffect(() => {
    if (Object.values(tatto).filter(value => value).length > 0 || !hasTatto) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [hasTatto, tatto]);

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
            alignContent: 'space-between',
          }}
        >
          <SelectInput
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
          />
          <SelectInput
            value={hasTatto && tatto['face']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['face'] = !newTatto['face'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['face']}
          />
          <SelectInput
            value={hasTatto && tatto['chest']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['chest'] = !newTatto['chest'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['chest']}
          />
          <SelectInput
            value={hasTatto && tatto['arm']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['arm'] = !newTatto['arm'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['arm']}
          />
          <SelectInput
            value={hasTatto && tatto['leg']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['leg'] = !newTatto['leg'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['leg']}
          />
          <SelectInput
            value={hasTatto && tatto['shoulder']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['shoulder'] = !newTatto['shoulder'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['shoulder']}
          />
          <SelectInput
            value={hasTatto && tatto['back']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['back'] = !newTatto['back'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['back']}
          />
          <SelectInput
            value={hasTatto && tatto['hand']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['hand'] = !newTatto['hand'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['hand']}
          />
          <SelectInput
            value={hasTatto && tatto['feet']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['feet'] = !newTatto['feet'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['feet']}
          />
          <SelectInput
            value={hasTatto && tatto['etc']}
            setValue={() => {
              const newTatto = { ...tatto };
              newTatto['etc'] = !newTatto['etc'];
              setTatto(newTatto);
              setHasTatto(true);
            }}
            placeholder={tattoNames['etc']}
          />
        </View>
        <FormButton
          active={complete}
          style={{ marginTop: getSize(88), marginBottom: getSize(49) }}
          onPress={() => {
            dispatch(setTattoData({ hasTatto, tatto }));
            router.back();
          }}
          text="다음"
        />
      </Container>
    </BackHeaderContainer>
  );
};

export default TattoFormScreen;
