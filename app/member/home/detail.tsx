import { useLocalSearchParams } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const onMessage = (data: MessageType) => {
  if (data.type === 'NAVIGATION_HOME') {
    Router.replace('/member');
  }

  if (data.type === 'NAVIGATION_MANAGE') {
    Router.replace('/member/manage');
  }
};

const JobPostIdScreen = () => {
  const { uri: webViewURI } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer uri={`${webViewURI}`} onMessage={onMessage} />
    </SafeContainer>
  );
};

export default JobPostIdScreen;
