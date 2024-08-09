import { useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/Container';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const DateScreen = () => {
  const { url: webViewURL, date } = useLocalSearchParams();

  return (
    <BackHeaderContainer>
      <WebViewContainer
        uri={`${webViewURL}`}
        onMessage={(data: MessageType) => {
          if (data.type === 'NAVIGATION_DETAIL') {
            Router.push({
              pathname: '/member/home/detail',
              params: {
                ...data.payload,
                history: '/member/home/date',
              },
            });
          }
        }}
      />
    </BackHeaderContainer>
  );
};

export default DateScreen;
