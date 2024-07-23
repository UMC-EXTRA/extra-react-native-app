import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ProfileScreen = () => {
  return (
    <BackHeaderContainer
      title="프로필"
      onPress={() => router.navigate('/home')}
    >
      <Text>Profile Page</Text>
    </BackHeaderContainer>
  );
};

export default ProfileScreen;
