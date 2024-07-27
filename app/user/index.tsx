import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { MainContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';

const HomeScreen = () => {
  return (
    <MainContainer>
      <HomeHeader />
      <WebView
        source={{ uri: 'https://extra-react-webview.vercel.app/' }}
        style={styles.webView}
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
