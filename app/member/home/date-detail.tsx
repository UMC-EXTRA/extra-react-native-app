import { useCallback } from 'react';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import CustomWebView from '@/components/CustomWebView';

const DateDetailScreen = () => {
  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'selectNotice') {
      router.push({
        pathname: '/member/home/detail',
        params: { notice_id: data.notice_id },
      });
    }
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

export default DateDetailScreen;
