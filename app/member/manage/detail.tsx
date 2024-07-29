import { StyleSheet, View, Text } from 'react-native';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { router } from 'expo-router';

const DetailScreen = () => {
  const title = 'umc 공고';

  return (
    <BackHeaderContainer
      title={title}
      onPress={() => router.replace('/member/manage')}
    >
      <View></View>
    </BackHeaderContainer>
  );
};

export default DetailScreen;
