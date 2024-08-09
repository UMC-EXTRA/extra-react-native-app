import React, { useRef, forwardRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { weight200, weight700, MainText } from './Theme/Text';
import { weight800 } from '@/components/Theme/Text';
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
  subText: {
    ...weight200,
    width: getSize(368),
    lineHeight: getSize(15),
    fontSize: getSize(14),
  },
  input: {
    backgroundColor: '#000',
    width: getSize(368),
    height: getSize(59),
    borderRadius: getSize(15),
    borderStyle: 'solid',
    borderWidth: getSize(2),
    borderColor: colors.placeholder,
    marginBottom: getSize(9),
    marginHorizontal: 'auto',
    paddingHorizontal: getSize(26),
  },
  inputText: {
    ...weight700,
    fontSize: getSize(14),
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

const FormMainText = () => {
  return (
    <>
      <MainText
        align="left"
        height={41}
        style={{
          marginTop: getSize(29),
          width: getSize(368),
        }}
      >
        필수 정보를 입력해주세요.
      </MainText>
      <Text style={{ ...styles.subText, marginTop: getSize(18) }}>
        일자리 신청에 꼭 필요한
      </Text>
      <Text
        style={{
          ...styles.subText,
          marginTop: getSize(5),
          marginBottom: getSize(39),
        }}
      >
        정보를 입력해주세요.
      </Text>
    </>
  );
};

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
    <TouchableOpacity
      style={{
        ...styles.input,
        ...styles.selectInput,
        ...style,
      }}
      onPress={onPress}
    >
      <Text style={styles.inputText}>
        {condition ? (
          value
        ) : (
          <Text style={{ color: colors.placeholder }}>{placeholder}</Text>
        )}
      </Text>
      <AntDesign name="caretright" size={getSize(20)} color="white" />
    </TouchableOpacity>
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

type SelectItem = {
  title: string;
  value: any;
};

interface SelectBoxProps {
  onChange: (value: any) => void;
  items: SelectItem[];
  placeholder: string;
}

const SelectBox = ({ onChange, items, placeholder }: SelectBoxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);

  const screenSize = Dimensions.get('window');

  return (
    <>
      {open && (
        <Pressable
          style={{
            position: 'absolute',
            width: screenSize.width,
            height: screenSize.height,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, .5)',
            zIndex: 100,
          }}
          onPress={() => setOpen(false)}
        />
      )}
      <TouchableOpacity
        style={{
          ...styles.input,
          zIndex: 1000,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => setOpen(!open)}
      >
        {value === null ? (
          <Text style={{ ...styles.inputText, color: colors.placeholder }}>
            {placeholder}
          </Text>
        ) : (
          <Text style={{ ...styles.inputText, color: colors.defaultText }}>
            {value}
          </Text>
        )}
        {open && (
          <View
            style={{
              position: 'absolute',
              zIndex: 101,
              width: getSize(368),
              top: getSize(59),
              left: 0,
              backgroundColor: colors.headerBackground,
              borderRadius: 10,
            }}
          >
            {items.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onChange(data.value);
                  setValue(data.title);
                  setOpen(false);
                }}
                style={{
                  height: getSize(59),
                  justifyContent: 'center',
                  paddingHorizontal: getSize(26),
                }}
              >
                <Text style={styles.inputText}>{data.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <FontAwesome
          name={open ? 'angle-up' : 'angle-down'}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
};

interface ErrorTextProps {
  children: React.ReactNode;
  style?: object;
}

const ErrorText: React.FC<ErrorTextProps> = props => {
  return (
    <Text
      {...props}
      style={{
        ...weight800,
        color: 'red',
        width: getSize(368),
        marginBottom: getSize(19),
        paddingLeft: getSize(10),
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const InputStyle = styles.input;
export const InputTextStyle = styles.inputText;
export {
  getRefInput,
  onFocusNext,
  Input,
  SelectBox,
  SelectInput,
  GradientSelectInput,
  FormMainText,
  ErrorText,
};
