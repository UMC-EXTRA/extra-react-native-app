import { useCallback, useEffect } from 'react';
import CustomWebView from '@/components/CustomWebView';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';
import { useAppDispatch } from '@/redux/hooks';
import { initManageState, setNoticeId } from '@/redux/manage/manageSlice';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'manageNotice') {
      dispatch(setNoticeId(data.notice_id));
      router.push('/member/manage/detail');
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initManageState({ type: 'member' }));
    };
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
