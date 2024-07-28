import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import CustomWebView from '@/components/CustomWebView';
import { MainContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';

const HomeScreen = () => {
  const onMessage = useCallback((event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }, []);

  return (
    <MainContainer>
      <HomeHeader />
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default HomeScreen;
