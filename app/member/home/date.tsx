import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/Container';
import WebViewContainer from '@/components/WebViewContainer';
import type { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';

const DateScreen = () => {
  const [title, setTitle] = useState('');

  const { url: webViewURL } = useLocalSearchParams();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_DETAIL') {
      const typedData = data as MessageType & {
        payload: {
          url: string;
        };
      };
      Router.push({
        pathname: '/member/home/detail',
        params: {
          url: typedData.payload.url,
        },
      });
    }

    if (data.type === 'POST_DATA') {
      const typedData = data as MessageType & {
        payload: {
          title: string;
        };
      };
      setTitle(typedData.payload.title);
    }
  };

  return (
    <BackHeaderContainer title={title}>
      <WebViewContainer uri={`${webViewURL}`} onMessage={onMessage} />
    </BackHeaderContainer>
  );
};

export default DateScreen;
