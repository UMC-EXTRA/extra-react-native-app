import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ChatScreen = () => {
  return (
    <BackHeaderContainer title="채팅" onPress={() => router.navigate('/home')}>
      <Text>Chat Page</Text>
    </BackHeaderContainer>
  );
};

export default ChatScreen;
