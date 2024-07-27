import WebView from 'react-native-webview';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ManageScreen = () => {
  return (
    <BackHeaderContainer
      title="촬영 관리"
      onPress={() => router.navigate('/user')}
    >
      <WebView
        // 아래 링크를 수정하세요.
        source={{ uri: 'https://extra-react-webview.vercel.app' }}
        style={{ flex: 1 }}
      />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
