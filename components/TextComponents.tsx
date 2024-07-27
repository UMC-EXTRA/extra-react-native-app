import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

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
});

interface Props {
  style?: object;
  children: React.ReactNode;
}

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

export { MainText, MainLightText, SubText };
