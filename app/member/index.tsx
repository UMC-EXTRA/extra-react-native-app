import WebViewContainer from '@/components/WebViewContainer';
import { MainContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';

const HomeScreen = () => {
  return (
    <MainContainer>
      <HomeHeader />
      <WebViewContainer uri="" />
    </MainContainer>
  );
};

export default HomeScreen;
