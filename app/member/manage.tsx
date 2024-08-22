import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import { useAppDispatch } from '@/redux/hooks';
import { setId, setTitle } from '@/redux/manage/memberManageSlice';
import { useRef } from 'react';

const ManageScreen = () => {
  const webViewRef = useRef(null);
  const dispatch = useAppDispatch();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_MANAGE') {
      webViewRef.current?.reload();
    }
    if (data.type === 'NAVIGATION_MANAGE_DETAIL') {
      const typedData = data as MessageType & {
        payload: {
          jobPostId: number;
          roleId: number;
          title: string;
        };
      };
      dispatch(setId(typedData.payload));
      dispatch(setTitle(typedData.payload.title));
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

  return (
    <BackHeaderContainer
      title="촬영 관리"
      onPress={() => Router.push('/member')}
    >
      <WebViewContainer
        uri="/extra-shoot-manage"
        onMessage={onMessage}
        ref={webViewRef}
      />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
