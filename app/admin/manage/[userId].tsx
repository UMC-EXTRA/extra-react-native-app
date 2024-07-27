import { useCallback, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import CustomWebView from '@/components/CustomWebView';
import { SafeContainer } from '@/components/Container';

const RecruitScreen = () => {
  const webviewRef = useRef(null);
  const { userId } = useLocalSearchParams();

  useEffect(() => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({ userId }));
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
