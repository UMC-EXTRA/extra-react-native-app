import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Container } from '@/components/Container';
import { FormButton, MainText } from '@/components/FormComponents';
import colors from '@/constants/Colors';
import BackHeader from '@/components/BackHeader';
import getSize from '@/scripts/getSize';

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

type Tatto = {
  [key: string]: {
    name: string;
    value: boolean;
  };
};

const TattoFormScreen = () => {
  const [noTatto, setNoTatto] = useState(false);
  const [tattos, setTattos] = useState<Tatto>({
    face: { name: '얼굴', value: false },
    chest: { name: '가슴', value: false },
    arm: { name: '팔', value: false },
    leg: { name: '다리', value: false },
    shoulder: { name: '어깨', value: false },
    back: { name: '등', value: false },
    hand: { name: '손', value: false },
    feet: { name: '발', value: false },
    etc: { name: '기타', value: false },
  });
  const [enteredTatto, setEnteredTatto] = useState(false);

  useEffect(() => {
    if (
      Object.values(tattos).filter(tatto => tatto.value).length > 0 ||
      noTatto
    ) {
      setEnteredTatto(true);
    } else {
      setEnteredTatto(false);
    }
  }, [noTatto, tattos]);

  useEffect(() => {
    if (noTatto) {
      const newTattos = { ...tattos };
      for (let key in tattos) {
        newTattos[key].value = false;
      }
      setTattos(newTattos);
    }
  }, [noTatto]);

  useEffect(() => {
    if (Object.values(tattos).filter(tatto => tatto.value).length > 0) {
      setNoTatto(false);
    }
  }, [tattos]);

  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
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
            value={noTatto}
            setValue={() => setNoTatto(!noTatto)}
            placeholder="없음"
          />
          <SelectInput
            value={tattos['face'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['face'].value = !newTattos['face'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['face'].name}
          />
          <SelectInput
            value={tattos['chest'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['chest'].value = !newTattos['chest'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['chest'].name}
          />
          <SelectInput
            value={tattos['arm'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['arm'].value = !newTattos['arm'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['arm'].name}
          />
          <SelectInput
            value={tattos['leg'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['leg'].value = !newTattos['leg'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['leg'].name}
          />
          <SelectInput
            value={tattos['shoulder'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['shoulder'].value = !newTattos['shoulder'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['shoulder'].name}
          />
          <SelectInput
            value={tattos['back'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['back'].value = !newTattos['back'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['back'].name}
          />
          <SelectInput
            value={tattos['hand'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['hand'].value = !newTattos['hand'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['hand'].name}
          />
          <SelectInput
            value={tattos['feet'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['feet'].value = !newTattos['feet'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['feet'].name}
          />
          <SelectInput
            value={tattos['etc'].value}
            setValue={() => {
              const newTattos = { ...tattos };
              newTattos['etc'].value = !newTattos['etc'].value;
              setTattos(newTattos);
            }}
            placeholder={tattos['etc'].name}
          />
        </View>
        <FormButton
          active={enteredTatto}
          style={{ marginTop: getSize(88), marginBottom: getSize(49) }}
          onPress={() => console.log('next')}
          text="다음"
        />
      </Container>
    </View>
  );
};

export default TattoFormScreen;
