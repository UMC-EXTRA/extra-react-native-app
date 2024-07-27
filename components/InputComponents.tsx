import { useRef, forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MainText } from '@/components/TextComponents';
/**
 * Get ref_input array
 * @param length length of ref_input: number
 * @returns ref_input: Array<React.RefObject<TextInput>>
 */
const getRefInput = (length: number) => {
  const ref_input: Array<React.RefObject<TextInput>> = [];
  for (let i = 0; i < length; i++) {
    ref_input[i] = useRef(null);
  }
  return ref_input;
};

/**
 * AutoFocus next input
 * @param ref_input ref_input: Array<React.RefObject<TextInput>>
 * @param index index: number
 */
const onFocusNext = (
  ref_input: Array<React.RefObject<TextInput>>,
  index: number,
) => {
  if (ref_input[index + 1] && index < ref_input.length - 1) {
    ref_input[index + 1].current?.focus();
  }
  if (ref_input[index + 1] && index == ref_input.length - 1) {
    ref_input[index].current?.blur();
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#000',
    width: getSize(368),
    height: getSize(59),
    borderRadius: getSize(15),
    borderStyle: 'solid',
    borderWidth: getSize(2),
    borderColor: '#696969',
    color: '#fff',
    fontSize: getSize(14),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    marginBottom: 19,
    marginHorizontal: 'auto',
    paddingHorizontal: getSize(26),
  },
  inputText: {
    color: '#fff',
    fontSize: getSize(14),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientSelectInput: {
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

// Input component type
interface InputProps extends Omit<TextInputProps, 'style'> {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  style?: object;
}

// Input component
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      returnKeyType = 'next',
      onSubmitEditing,
      style,
      ...restProps
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        style={{ ...styles.input, ...styles.inputText, ...style }}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        {...restProps}
      />
    );
  },
);

interface SelectInputProps {
  condition: boolean;
  value: string;
  placeholder: string;
  onPress: () => void;
  style?: object;
}

const SelectInput = ({
  condition,
  value,
  placeholder,
  onPress,
  style = {},
}: SelectInputProps) => {
  return (
    <View
      style={{
        ...styles.input,
        ...styles.selectInput,
        ...style,
      }}
    >
      <Text style={styles.inputText}>
        {condition ? (
          value
        ) : (
          <Text style={{ color: colors.placeholder }}>{placeholder}</Text>
        )}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="caretright" size={getSize(20)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

interface GradientSelectInputProps {
  value: boolean;
  setValue: () => void;
  placeholder: string;
  style?: object;
}

const GradientSelectInput = ({
  value,
  setValue,
  placeholder,
  style = {},
}: GradientSelectInputProps) => {
  return (
    <TouchableOpacity
      onPress={() => setValue()}
      style={{
        ...styles.gradientSelectInput,
        ...(!value && { backgroundColor: '#656565' }),
        ...style,
      }}
    >
      {value ? (
        <LinearGradient
          colors={['#fff', colors.highlight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
          <View style={styles.textContainer}>
            <MainText>{placeholder}</MainText>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.textContainer}>
          <MainText>{placeholder}</MainText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const InputStyle = styles.input;
export const InputTextStyle = styles.inputText;
export { Input, SelectInput, GradientSelectInput };
export { getRefInput, onFocusNext };
