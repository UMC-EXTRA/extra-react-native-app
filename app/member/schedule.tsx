import WebViewContainer from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';

const ScheduleScreen = () => {
  return (
    <BackHeaderContainer
      title="스케줄표"
      onPress={() => Router.navigate('/member')}
    >
      <WebViewContainer uri="/scheduler" />
    </BackHeaderContainer>
  );
};

export default ScheduleScreen;
