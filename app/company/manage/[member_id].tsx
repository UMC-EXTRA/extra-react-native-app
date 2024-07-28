import { useCallback, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import CustomWebView from '@/components/CustomWebView';
import { SafeContainer } from '@/components/Container';

const RecruitScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const { member_id } = useLocalSearchParams();

  useEffect(() => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({ member_id }));
    }
  }, []);

  const onMessage = useCallback((event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }, []);

  return (
    <SafeContainer>
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
        ref={webviewRef}
      />
    </SafeContainer>
  );
};

export default RecruitScreen;
