import WebView from 'react-native-webview';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const RecruitScreen = () => {
  return (
    <BackHeaderContainer title="공고" onPress={() => router.navigate('/admin')}>
      <WebView
        // 아래 링크를 수정하세요.
        source={{ uri: 'https://extra-react-webview.vercel.app' }}
        style={{ flex: 1 }}
      />
    </BackHeaderContainer>
  );
};

export default RecruitScreen;
