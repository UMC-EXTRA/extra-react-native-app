import { useLocalSearchParams } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const onMessage = (data: MessageType) => {
  if (data.type === 'NAVIGATION_HOME') {
    Router.replace('/company');
  }

  if (data.type === 'NAVIGATION_MANAGE') {
    Router.replace('/company/manage');
  }
};

const JobPostIdScreen = () => {
  const { history, url: webViewURL } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer
        uri={`${webViewURL}`}
        history={`${history}`}
        onMessage={onMessage}
      />
    </SafeContainer>
  );
};

export default JobPostIdScreen;
