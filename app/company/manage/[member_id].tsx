import { useCallback, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import CustomWebView from '@/components/CustomWebView';
import { SafeContainer } from '@/components/Container';

const MemberIdScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const { member_id } = useLocalSearchParams();

  useEffect(() => {
    const message = { member_id };
    webviewRef.current?.postMessage(JSON.stringify(message));
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

export default MemberIdScreen;
