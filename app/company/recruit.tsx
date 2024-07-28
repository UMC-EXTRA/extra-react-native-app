import { useCallback } from 'react';
import { router } from 'expo-router';
import CustomWebView from '@/components/CustomWebView';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const RecruitScreen = () => {
  const onMessage = useCallback((event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }, []);

  return (
    <BackHeaderContainer
      title="공고"
      onPress={() => router.navigate('/company')}
    >
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </BackHeaderContainer>
  );
};

export default RecruitScreen;
