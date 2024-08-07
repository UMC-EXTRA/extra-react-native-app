import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { MainText } from '@/components/Theme/Text';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

interface Props {
  children: React.ReactNode;
  style?: object;
}

const SafeContainer = ({ children, style = {} }: Props) => {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={{ ...styles.container, ...style }}>
        {children}
      </SafeAreaView>
    );
  } else {
    return (
      <MainContainer
        style={{ ...styles.container, paddingTop: getSize(47), ...style }}
      >
        {children}
      </MainContainer>
    );
  }
};

const Container = ({ children, style = {} }: Props) => {
  return (
    <View style={{ ...styles.container, alignItems: 'center', ...style }}>
      {children}
    </View>
  );
};

const MainContainer = ({ children, style = {} }: Props) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

interface BackHeaderProps {
  title?: string | null;
  onPress?: () => void;
  backgroundColor?: string;
}

const BackHeader = ({
  title = null,
  onPress = () => router.back(),
  backgroundColor,
}: BackHeaderProps) => {
  return (
    <View
      style={{
        paddingTop: getSize(60),
        justifyContent: 'center',
        height: getSize(155),
        width: '100%',
        backgroundColor: backgroundColor || colors.headerBackground,
      }}
    >
      <TouchableOpacity
        style={{
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: getSize(60),
          height: getSize(95),
          paddingLeft: getSize(34),
          width: getSize(100),
          justifyContent: 'center',
        }}
        onPress={onPress}
      >
        <FontAwesome name="angle-left" size={getSize(40)} color="white" />
      </TouchableOpacity>
      {title && (
        <MainText size={24} height={95} spacing={0.24}>
          {title}
        </MainText>
      )}
    </View>
  );
};

interface BackHeaderContainerProps extends BackHeaderProps {
  children: React.ReactNode;
}

const BackHeaderContainer = ({
  children,
  title = null,
  onPress = () => router.back(),
  backgroundColor,
}: BackHeaderContainerProps) => {
  return (
    <MainContainer>
      <BackHeader
        title={title}
        onPress={onPress}
        backgroundColor={backgroundColor}
      />
      {children}
    </MainContainer>
  );
};

export { SafeContainer, Container, MainContainer, BackHeaderContainer };
