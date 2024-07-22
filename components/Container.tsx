import { SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '@/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

interface Props {
  children: React.ReactNode;
  style?: object;
}

const SafeContainer = ({ children, style = {} }: Props) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...style }}>
      {children}
    </SafeAreaView>
  );
};

const Container = ({ children, style = {} }: Props) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export { SafeContainer, Container };
