import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';
import { Router } from '@/scripts/router';

const onMessage = (data: MessageType) => {
  if (data.type === 'NAVIGATION_DETAIL') {
    Router.push({
      pathname: '/company/home/detail',
      params: {
        ...data.payload,
        history: '/company',
      },
    });
  }
};

const HomeScreen = () => {
  return (
    <SafeContainer>
      <HomeHeader />
      <WebViewContainer uri="/company-home" onMessage={onMessage} />
    </SafeContainer>
  );
};

export default HomeScreen;
