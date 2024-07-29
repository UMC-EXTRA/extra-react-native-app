import { useCallback, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { WebView } from 'react-native-webview';
import CustomWebView from '@/components/CustomWebView';

const DateScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const { date } = useLocalSearchParams();

  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'selectNotice') {
      router.push({
        pathname: '/member/home/[notice_id]',
        params: { notice_id: data.notice_id },
      });
    }
  }, []);

  useEffect(() => {
    const message = { date };
    webviewRef.current?.postMessage(JSON.stringify(message));
  }, []);

  return (
    <BackHeaderContainer title="날짜별 상세" onPress={() => router.back()}>
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </BackHeaderContainer>
  );
};

export default DateScreen;
