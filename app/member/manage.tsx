import { useCallback, useEffect } from 'react';
import WebViewContainer from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import { useAppDispatch } from '@/redux/hooks';
import { initManageState, setJobPostId } from '@/redux/manage/manageSlice';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event: any) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data);
    if (type === 'NAVIGATION') {
      dispatch(setJobPostId(payload.params.job_post_id));
      Router.push(payload);
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
      onPress={() => Router.push('/member')}
    >
      <WebViewContainer uri="" onMessage={onMessage} />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
