import { useRef, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Router } from '@/scripts/router';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface WebViewContainerProps {
  uri: string;
  onMessage?: (data: object) => void;
  dataForWebView?: object;
  history?: string;
}

const WebViewContainer = ({
  uri,
  onMessage,
  dataForWebView,
  history,
  ...restProps
}: WebViewContainerProps) => {
  const webViewRef = useRef<WebView>(null);

  const sendMessage = (data: object) => {
    webViewRef.current?.postMessage(JSON.stringify(data));
  };

  const messageHandler = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (onMessage) {
      onMessage(data);
    } else {
      switch (data.type) {
        case 'NAVIGATION':
          Router.push({
            pathname: data.payload.url,
            params: data.payload.params,
          });
        case 'HISTORY_BACK':
          if (history) {
            Router.navigate(history);
          } else {
            Router.back();
          }
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
      startInLoadingState={true}
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
