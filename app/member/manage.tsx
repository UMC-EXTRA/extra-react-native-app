import { useEffect } from 'react';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import { useAppDispatch } from '@/redux/hooks';
import { initManageState, setJobPostId } from '@/redux/manage/manageSlice';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_MANAGE') {
      const typedData = data as MessageType & {
        payload: {
          job_post_id: number;
        };
      };
      dispatch(setJobPostId(typedData.payload.job_post_id));
      Router.push('/member/manage/detail');
    }
    if (data.type === 'NAVIGATION_DETAIL') {
      Router.push({
        pathname: '/member/home/detail',
        params: {
          ...data.payload,
          history: '/member/manage',
        },
      });
    }
  };

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
      <WebViewContainer uri="/extra-shoot-manage" onMessage={onMessage} />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
