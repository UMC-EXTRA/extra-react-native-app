import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import CustomWebView from '@/components/CustomWebView';
import { MainContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';

const HomeScreen = () => {
  const onMessage = useCallback((event: any) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'selectList') {
      router.push({
        pathname: '/member/home/[notice_id]',
        params: { notice_id: data.notice_id },
      });
    }
    if (type === 'selectDate') {
      router.push({
        pathname: '/member/home/[date]',
        params: { date: data.date },
      });
    }
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
