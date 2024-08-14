import { useLocalSearchParams } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const JobPostIdScreen = () => {
  const { history, uri: webViewURI } = useLocalSearchParams();

  console.log(webViewURI);

  const onMessage = (data: MessageType) => {};

  return (
    <SafeContainer>
      <WebViewContainer
        uri={`${webViewURI}`}
        history={`${history}`}
        onMessage={onMessage}
      />
    </SafeContainer>
  );
};

export default JobPostIdScreen;
