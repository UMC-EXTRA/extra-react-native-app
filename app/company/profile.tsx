import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ProfileScreen = () => {
  return (
    <BackHeaderContainer
      title="마이페이지"
      onPress={() => router.navigate('/company')}
    >
      <Text>Profile Page</Text>
    </BackHeaderContainer>
  );
};

export default ProfileScreen;
