import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';
import { Router } from '@/scripts/router';

const HomeScreen = () => {
  return (
    <SafeContainer>
      <HomeHeader />
      <WebViewContainer
        onMessage={(data: MessageType) => {
          if (data.type === 'NAVIGATION_DETAIL') {
            Router.push({
              pathname: '/member/home/detail',
              params: {
                ...data.payload,
                history: '/member',
              },
            });
          }
          if (data.type === 'NAVIGATION_DATE') {
            Router.push({
              pathname: '/member/home/date',
              params: {
                ...data.payload,
                history: '/member',
              },
            });
          }
        }}
      />
    </SafeContainer>
  );
};

export default HomeScreen;
