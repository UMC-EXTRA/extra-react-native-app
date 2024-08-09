import { useLocalSearchParams } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import WebViewContainer from '@/components/WebViewContainer';

const JobPostIdScreen = () => {
  const { history, url: webViewURL } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer uri={`${webViewURL}`} history={`${history}`} />
    </SafeContainer>
  );
};

export default JobPostIdScreen;
