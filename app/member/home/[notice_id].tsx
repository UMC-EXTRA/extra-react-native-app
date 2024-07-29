import { useCallback, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { WebView } from 'react-native-webview';
import CustomWebView from '@/components/CustomWebView';

const NoticeIdScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const { notice_id } = useLocalSearchParams();

  const onMessage = useCallback((event: any) => {
    const { type } = JSON.parse(event.nativeEvent.data);
    if (type === 'back') {
      router.back();
    }
  }, []);

  useEffect(() => {
    const message = { notice_id };
    webviewRef.current?.postMessage(JSON.stringify(message));
  }, []);

  return (
    <CustomWebView
      uri="https://extra-react-webview.vercel.app"
      onMessage={onMessage}
    />
  );
};

export default NoticeIdScreen;
