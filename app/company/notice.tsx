import WebViewContainer from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';

const NoticeScreen = () => {
  return (
    <SafeContainer>
      <WebViewContainer uri="/manager-dashboard" />
    </SafeContainer>
  );
};

export default NoticeScreen;
