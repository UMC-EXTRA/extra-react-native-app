import { View } from 'react-native';
import WebView from 'react-native-webview';
import { router } from 'expo-router';
import BackHeader from '@/components/BackHeader';

const ScheduleScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BackHeader title="스케줄표" onPress={() => router.navigate('/home')} />
      <WebView
        // 아래 링크를 수정하세요.
        source={{ uri: 'https://extra-react-webview.vercel.app' }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default ScheduleScreen;
