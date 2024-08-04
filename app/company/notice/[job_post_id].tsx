import { useLocalSearchParams } from 'expo-router';
import WebViewContainer from '@/components/WebViewContainer';

const JobPostIdScreen = () => {
  const { job_post_id } = useLocalSearchParams();

  return (
    <WebViewContainer
      uri=""
      dataForWebView={{
        type: 'POST_DATA',
        payload: {
          job_post_id: job_post_id,
        },
        version: '1.0',
      }}
    />
  );
};

export default JobPostIdScreen;
