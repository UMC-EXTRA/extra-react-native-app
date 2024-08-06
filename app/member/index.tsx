import WebViewContainer from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';

const HomeScreen = () => {
  return (
    <SafeContainer>
      <HomeHeader />
      <WebViewContainer uri="" />
    </SafeContainer>
  );
};

export default HomeScreen;
