import { Text, View, StyleSheet } from 'react-native';
import BackHeader from '@/components/BackHeader';

const FindPassWordSceen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="비밀번호 찾기" />
      <Text>Find PW</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FindPassWordSceen;
