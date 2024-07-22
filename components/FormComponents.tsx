import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface Props {
  style?: object;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  mainText: {
    color: '#fff',
    lineHeight: getSize(41),
    fontSize: getSize(20),
    textAlign: 'center',
  },
  subText: {
    width: getSize(368),
    color: '#fff',
    fontSize: getSize(14),
    fontWeight: '200',
    fontFamily: 'Inter-Light',
    lineHeight: getSize(15),
  },
  linkButton: {
    width: getSize(299),
    height: getSize(53),
    borderRadius: getSize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: 700,
    fontSize: getSize(17),
    lineHeight: getSize(22),
  },
});

// Form main text
const MainText = ({ children, style = {} }: Props) => {
  return (
    <Text
      style={{
        ...styles.mainText,
        fontFamily: 'Inter-ExtraBold',
        fontWeight: '900',
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

// Form main text (font-weight: 500)
const MainLightText = ({ children, style = {} }: Props) => {
  return (
    <Text
      style={{
        ...styles.mainText,
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

// Form sub text
const SubText = ({ children, style = {} }: Props) => {
  return (
    <Text
      style={{
        ...styles.subText,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

interface LinkButtonProps {
  onPress?: () => void;
  text?: string;
  style?: object;
}

// Next link button
const NextLinkButton = ({ onPress, text, style = {} }: LinkButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.linkButton,
        backgroundColor: colors.highlight,
        ...style,
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: colors.activeText,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

// Back link button
const BackLinkButton = ({
  onPress = () => router.back(),
  text = '뒤로가기',
  style = {},
}: LinkButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.linkButton,
        backgroundColor: colors.disabled,
        ...style,
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: colors.inactiveText,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

interface FormButtonProps extends LinkButtonProps {
  active: boolean;
}

// Form submit button
const FormButton = ({ onPress, text, active, style = {} }: FormButtonProps) => {
  return (
    <TouchableOpacity
      disabled={!active}
      onPress={onPress}
      style={{
        ...styles.linkButton,
        width: getSize(383),
        ...style,
        backgroundColor: active ? colors.highlight : colors.disabled,
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: active ? colors.activeText : colors.inactiveText,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export {
  MainText,
  MainLightText,
  SubText,
  NextLinkButton,
  BackLinkButton,
  FormButton,
};
