import { useLocalSearchParams } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const DetailScreen = () => {
  const { history, uri: webViewURI } = useLocalSearchParams();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_APPLICANTS') {
      Router.replace({
        pathname: '/company/home/applicants',
        params: {
          ...data.payload,
        },
      });
    }

    if (data.type === 'NAVIGATION_MANAGE') {
      Router.replace('/company/manage');
    }
  };

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

export default DetailScreen;
