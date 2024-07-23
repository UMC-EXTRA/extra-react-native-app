import { View } from 'react-native';
import WebView from 'react-native-webview';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ScheduleScreen = () => {
  return (
    <BackHeaderContainer
      title="스케줄표"
      onPress={() => router.navigate('/home')}
    >
      <WebView
        // 아래 링크를 수정하세요.
        source={{ uri: 'https://extra-react-webview.vercel.app' }}
        style={{ flex: 1 }}
      />
    </BackHeaderContainer>
  );
};

export default ScheduleScreen;
