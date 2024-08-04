import { router, useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/Container';
import WebViewContainer from '@/components/WebViewContainer';

const DateScreen = () => {
  const { date } = useLocalSearchParams();

  return (
    <BackHeaderContainer title="날짜별 상세" onPress={() => router.back()}>
      <WebViewContainer
        uri=""
        dataForWebView={{
          type: 'POST_DATA',
          payload: {
            date: date,
          },
          version: '1.0',
        }}
      />
    </BackHeaderContainer>
  );
};

export default DateScreen;
