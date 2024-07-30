import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { TextWeight700, MainText } from '@/components/Theme/Text';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface DefaultButtonProps {
  onPress: () => void;
  text?: string;
  textStyle?: object;
  style?: object;
  isConfirm?: boolean;
  fontSize?: number;
  width?: number;
  height?: number;
  radius?: number;
  disabled?: boolean;
}

const DefaultButton = ({
  onPress,
  text = '',
  style = {},
  textStyle = {},
  fontSize = 17,
  isConfirm = true,
  width = 299,
  height = 53,
  radius = 18,
  disabled = false,
}: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: getSize(width),
        height: getSize(height),
        borderRadius: getSize(radius),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isConfirm ? colors.highlight : colors.disabled,
        ...style,
      }}
    >
      <TextWeight700
        style={{
          color: isConfirm ? colors.activeText : colors.inactiveText,
          fontSize: getSize(fontSize),
          ...textStyle,
        }}
      >
        {text}
      </TextWeight700>
    </TouchableOpacity>
  );
};

const ConfirmButton = ({ isConfirm = true, ...props }: DefaultButtonProps) => {
  return <DefaultButton {...props} isConfirm={isConfirm} />;
};
const CancelButton = ({
  isConfirm = false,
  text = '취소',
  ...props
}: DefaultButtonProps) => {
  return <DefaultButton {...props} isConfirm={isConfirm} text={text} />;
};
const BackLinkButton = ({
  text = '뒤로 가기',
  onPress = () => router.back(),
  ...props
}: DefaultButtonProps) => {
  return <CancelButton {...props} text={text} onPress={onPress} />;
};

interface FormButtonProps extends DefaultButtonProps {
  valid: boolean;
}

const FormButton = ({ width = 383, ...props }: FormButtonProps) => {
  const [isConfirm, setIsConfirm] = useState(props.valid);
  const [disabled, setDisabled] = useState(!props.valid);

  useEffect(() => {
    setIsConfirm(props.valid);
    setDisabled(!props.valid);
  }, [props.valid]);
  return (
    <DefaultButton
      {...props}
      width={width}
      isConfirm={isConfirm}
      disabled={disabled}
    />
  );
};

export {
  DefaultButton,
  ConfirmButton,
  CancelButton,
  BackLinkButton,
  FormButton,
};

interface ManageButtonProps {
  onPress: () => void;
  text: string;
  style?: object;
}

const ManageButton = ({ onPress, text, style = {} }: ManageButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: getSize(178),
        height: getSize(100),
        borderRadius: getSize(20),
        backgroundColor: colors.grayBackground,
        marginBottom: getSize(30),
        ...style,
      }}
    >
      <MainText
        size={24}
        spacing={0.24}
        style={{
          position: 'absolute',
          top: getSize(20),
          left: getSize(20),
        }}
      >
        {text}
      </MainText>
      <FontAwesome
        style={{
          position: 'absolute',
          bottom: getSize(18),
          right: getSize(18),
        }}
        name="angle-right"
        size={getSize(25)}
        color="white"
      />
    </TouchableOpacity>
  );
};

interface ToggleButtonProps {
  initValue: boolean;
  onChange: (value: boolean) => void;
  style?: object;
}

const ToggleButton = ({
  initValue,
  onChange,
  style = {},
}: ToggleButtonProps) => {
  const [value, setValue] = useState(initValue);

  const animation = new Animated.Value(0);

  const toggle = () => {
    Animated.timing(animation, {
      toValue: value ? getSize(32) : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    toggle();
    onChange(value);
  }, [value]);

  return (
    <TouchableOpacity
      style={{
        width: getSize(57),
        height: getSize(26),
        borderRadius: getSize(20),
        padding: 3,
        backgroundColor: value ? colors.highlight : colors.grayBackground,
        ...style,
      }}
      onPress={() => {
        setValue(!value);
      }}
    >
      {/* <Shadow
        inner
        useArt
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          width: getSize(57),
          height: getSize(26),
          borderRadius: getSize(20),
          padding: 3,
          backgroundColor: value ? colors.highlight : colors.grayBackground,
          ...style,
        }}
      > */}
      <View>
        <Animated.View
          style={{
            width: getSize(19),
            height: getSize(19),
            backgroundColor: '#fff',
            borderRadius: getSize(20),
            position: 'absolute',
            left: animation,
          }}
        />
      </View>
      {/* </Shadow> */}
    </TouchableOpacity>
  );
};

export { ManageButton, ToggleButton };
