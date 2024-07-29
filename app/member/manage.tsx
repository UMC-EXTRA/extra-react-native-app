import { useCallback } from 'react';
import CustomWebView from '@/components/CustomWebView';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ManageScreen = () => {
  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'manageNotice') {
      router.push({
        pathname: '/member/manage/detail',
        params: { notice_id: data.notice_id },
      });
    }
  }, []);

  return (
    <BackHeaderContainer
      title="촬영 관리"
      onPress={() => router.navigate('/member')}
    >
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
