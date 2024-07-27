import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { MainText } from '@/components/TextComponents';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  style?: object;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
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
  manageButton: {
    width: getSize(178),
    height: getSize(100),
    borderRadius: getSize(20),
    backgroundColor: colors.grayBackground,
    marginBottom: getSize(30),
    position: 'relative',
  },
});

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
        ...styles.manageButton,
        ...style,
      }}
    >
      <MainText
        style={{
          fontSize: getSize(24),
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

export { NextLinkButton, BackLinkButton, FormButton, ManageButton };
