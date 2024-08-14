import { SafeContainer } from '@/components/Container';
import WebViewContainer from '@/components/WebViewContainer';
import { useLocalSearchParams } from 'expo-router';

const RegisterScreen = () => {
  const { uri: webViewURI } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer uri={`${webViewURI}`} />
    </SafeContainer>
  );
};

export default RegisterScreen;
