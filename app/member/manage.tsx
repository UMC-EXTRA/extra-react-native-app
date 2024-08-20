import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import { useAppDispatch } from '@/redux/hooks';
import { setId } from '@/redux/manage/memberManageSlice';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_MANAGE') {
      const typedData = data as MessageType & {
        payload: {
          jobPostId: number;
          roleId: number;
        };
      };
      dispatch(setId(typedData.payload));
      Router.push('/member/manage/detail');
    }
    if (data.type === 'NAVIGATION_DETAIL') {
      Router.push({
        pathname: '/member/index/detail',
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
      <WebViewContainer uri="/extra-shoot-manage" onMessage={onMessage} />
    </BackHeaderContainer>
  );
};

export default ManageScreen;
