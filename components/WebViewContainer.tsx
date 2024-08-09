import { useRef, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Router } from '@/scripts/router';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export type MessageType = {
  type: string;
  payload?: object;
  version: string;
};

interface WebViewContainerProps {
  uri?: string;
  onMessage?: (data: MessageType) => void;
  dataForWebView?: MessageType;
  history?: string;
}

const WebViewContainer = ({
  uri = '',
  onMessage,
  dataForWebView,
  history,
  ...restProps
}: WebViewContainerProps) => {
  const webViewRef = useRef<WebView>(null);

  const sendMessage = (data: MessageType) => {
    webViewRef.current?.postMessage(JSON.stringify(data));
  };

  const messageHandler = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (onMessage) {
      onMessage(data);
    } else {
      switch (data.type) {
        case 'HISTORY_BACK':
          if (history) {
            Router.navigate(history);
          } else {
            Router.back();
          }
          break;
      }
    }
  };

  useEffect(() => {
    if (dataForWebView) {
      sendMessage(dataForWebView);
    }
  }, []);

  return (
    <WebView
      // 아래 링크를 수정하세요.
      ref={webViewRef}
      source={{ uri: `${process.env.EXPO_PUBLIC_WEBVIEW_URL}${uri}` }}
      style={styles.webview}
      onMessage={messageHandler}
      bounces={false}
      startInLoadingState={true}
      cacheEnabled={true}
      renderLoading={() => (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default WebViewContainer;
