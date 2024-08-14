import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import { Router } from '@/scripts/router';

const NoticeScreen = () => {
  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_ADD_NOTICE') {
      Router.push({
        pathname: '/company/notice/add',
        params: {
          ...data.payload,
        },
      });
    }
  };

  return (
    <SafeContainer>
      <WebViewContainer uri="/manager-dashboard" onMessage={onMessage} />
    </SafeContainer>
  );
};

export default NoticeScreen;
