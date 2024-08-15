import { useLocalSearchParams } from 'expo-router';
import WebViewContainer from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';

const ApplicantDetailScreen = () => {
  const { memberId, memberName, history } = useLocalSearchParams();

  return (
    <SafeContainer>
      <WebViewContainer
        uri="/applicants/detail"
        history={`${history}`}
        dataForWebView={{
          type: 'POST_DATA',
          payload: {
            id: memberId,
            name: memberName,
          },
          version: '1.0',
        }}
      />
    </SafeContainer>
  );
};

export default ApplicantDetailScreen;
