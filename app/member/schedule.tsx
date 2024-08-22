import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import { useAppDispatch } from '@/redux/hooks';
import { setId } from '@/redux/manage/memberManageSlice';

const ScheduleScreen = () => {
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
      title="스케줄표"
      onPress={() => Router.navigate('/member')}
    >
      <WebViewContainer uri="/scheduler" onMessage={onMessage} />
    </BackHeaderContainer>
  );
};

export default ScheduleScreen;
