import { useCallback } from 'react';
import { router } from 'expo-router';
import CustomWebView from '@/components/CustomWebView';

const DetailScreen = () => {
  const onMessage = useCallback((event: any) => {
    const { type } = JSON.parse(event.nativeEvent.data);
    if (type === 'back') {
      router.back();
    }
  }, []);

  return (
    <CustomWebView
      uri="https://extra-react-webview.vercel.app"
      onMessage={onMessage}
    />
  );
};

export default DetailScreen;
