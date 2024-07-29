import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { MainContainer } from '@/components/Container';
import { MainText } from '@/components/TextComponents';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

interface Props {
  title?: string | null;
  onPress?: () => void;
}

const BackHeader = ({ title = null, onPress = () => router.back() }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <FontAwesome name="angle-left" size={getSize(40)} color="white" />
      </TouchableOpacity>
      {title && (
        <MainText style={{ fontSize: getSize(24), lineHeight: getSize(95) }}>
          {title}
        </MainText>
      )}
    </View>
  );
};

interface BackHeaderContainerProps extends Props {
  children: React.ReactNode;
}

const BackHeaderContainer = ({
  children,
  title = null,
  onPress = () => router.back(),
}: BackHeaderContainerProps) => {
  return (
    <MainContainer>
      <BackHeader title={title} onPress={onPress} />
      {children}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: getSize(60),
    justifyContent: 'center',
    height: getSize(155),
    width: '100%',
    backgroundColor: colors.headerBackground,
    position: 'relative',
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: getSize(60),
    height: getSize(95),
    paddingLeft: getSize(34),
    width: getSize(100),
    justifyContent: 'center',
  },
});

export { BackHeader, BackHeaderContainer };
