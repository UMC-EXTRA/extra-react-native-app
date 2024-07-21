import { Text, View, StyleSheet } from 'react-native';
import BackHeader from '@/components/BackHeader';

const FindIdScreen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="아이디 찾기" />
      <Text>Find ID</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FindIdScreen;
