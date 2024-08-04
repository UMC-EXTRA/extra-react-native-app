import { useLocalSearchParams } from 'expo-router';
import WebViewContainer from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';

const MemberIdScreen = () => {
  const { member_id } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer
        uri=""
        dataForWebView={{
          type: 'POST_DATA',
          payload: {
            member_id: member_id,
          },
          version: '1.0',
        }}
      />
    </SafeContainer>
  );
};

export default MemberIdScreen;
