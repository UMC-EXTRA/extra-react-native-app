import { Text } from 'react-native';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';

const ProfileScreen = () => {
  return (
    <BackHeaderContainer
      title="마이페이지"
      onPress={() => Router.navigate('/member')}
    >
      <Text>Profile Page</Text>
    </BackHeaderContainer>
  );
};

export default ProfileScreen;
