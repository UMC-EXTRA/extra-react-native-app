import { useCallback } from 'react';
import { router } from 'expo-router';
import CustomWebView from '@/components/CustomWebView';
import { SafeContainer } from '@/components/Container';

const RecruitScreen = () => {
  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'selectNotice') {
      router.push({
        pathname: '/company/notice/detail',
        params: { notice_id: data.notice_id },
      });
    }
    if (type === 'recruitNotice') {
      router.push({
        pathname: '/company/notice/register',
      });
    }
  }, []);

  return (
    <SafeContainer>
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </SafeContainer>
  );
};

export default RecruitScreen;
