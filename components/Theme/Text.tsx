import { FC, ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface Props extends TextProps {
  children: ReactNode;
  style?: object;
  size?: number;
  spacing?: number;
  height?: number;
  align?: 'left' | 'center' | 'right';
}

const DefaultText: FC<Props> = ({
  children,
  size,
  spacing,
  height,
  align,
  style = {},
}) => {
  if (size) style = { fontSize: getSize(size), ...style };
  if (spacing) style = { letterSpacing: spacing, ...style };
  if (height) style = { lineHeight: getSize(height), ...style };
  if (align) style = { textAlign: align, ...style };
  return <Text style={[styles.defaultText, style]}>{children}</Text>;
};

const TextWeight100: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight100, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight200: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight200, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight300: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight300, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight400: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight400, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight500: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight500, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight600: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight600, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight700: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight700, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight800: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight800, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};
const TextWeight900: FC<Props> = props => {
  return (
    <DefaultText {...props} style={{ ...weight900, ...props.style }}>
      {props.children}
    </DefaultText>
  );
};

const MainText: FC<Props> = ({
  children,
  style = {},
  size = 20,
  spacing = 0.5,
  height = 20,
  align = 'center',
}) => {
  return (
    <TextWeight900
      size={size}
      spacing={spacing}
      height={height}
      style={{
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </TextWeight900>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: colors.defaultText,
  },
  thinText: {
    fontFamily: 'Inter-Thin',
    fontWeight: '100',
    color: colors.defaultText,
  },
  extraLightText: {
    fontFamily: 'Inter-ExtraLight',
    fontWeight: '200',
    color: colors.defaultText,
  },
  lightText: {
    fontFamily: 'Inter-Light',
    fontWeight: '300',
    color: colors.defaultText,
  },
  regluarText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    color: colors.defaultText,
  },
  mediumText: {
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: colors.defaultText,
  },
  semiBoldText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: colors.defaultText,
  },
  boldText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: colors.defaultText,
  },
  extraBoldText: {
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '800',
    color: colors.defaultText,
  },
  blackText: {
    fontFamily: 'Inter-Black',
    fontWeight: '900',
    color: colors.defaultText,
  },
});

const weight100 = styles.thinText;
const weight200 = styles.extraLightText;
const weight300 = styles.lightText;
const weight400 = styles.regluarText;
const weight500 = styles.mediumText;
const weight600 = styles.semiBoldText;
const weight700 = styles.boldText;
const weight800 = styles.extraBoldText;
const weight900 = styles.blackText;
export {
  weight100,
  weight200,
  weight300,
  weight400,
  weight500,
  weight600,
  weight700,
  weight800,
  weight900,
};
export {
  TextWeight100,
  TextWeight200,
  TextWeight300,
  TextWeight400,
  TextWeight500,
  TextWeight600,
  TextWeight700,
  TextWeight800,
  TextWeight900,
};
export { MainText };
