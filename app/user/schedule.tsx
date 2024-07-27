import { useCallback } from 'react';
import CustomWebView from '@/components/CustomWebView';
import { router } from 'expo-router';
import { BackHeaderContainer } from '@/components/BackHeaderComponents';

const ScheduleScreen = () => {
  const onMessage = useCallback((event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }, []);

  return (
    <BackHeaderContainer
      title="스케줄표"
      onPress={() => router.navigate('/user')}
    >
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </BackHeaderContainer>
  );
};

export default ScheduleScreen;
