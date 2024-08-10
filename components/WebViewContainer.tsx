import { useRef, useEffect, useCallback, useState, memo } from 'react';
import { useFocusEffect } from 'expo-router';
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
  const [reloadKey, setReloadKey] = useState(0);

  const webViewRef = useRef<WebView>(null);

  const sendMessage = (data: MessageType) => {
    webViewRef.current?.postMessage(JSON.stringify(data));
  };

  const messageHandler = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (onMessage) {
      onMessage(data);
    }
    switch (data.type) {
      case 'HISTORY_BACK':
        if (history) {
          Router.navigate(history);
        } else {
          Router.back();
        }
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      () => {
        setReloadKey(prevKey => prevKey + 1);
      };
    }, []),
  );

  useEffect(() => {
    if (dataForWebView) {
      sendMessage(dataForWebView);
    }
  }, []);

  const INJECTEDJAVASCRIPT = `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
  `;

  return (
    <WebView
      key={reloadKey}
      ref={webViewRef}
      source={{ uri: `${process.env.EXPO_PUBLIC_WEBVIEW_URL}${uri}` }}
      onMessage={messageHandler}
      bounces={false}
      startInLoadingState={true}
      cacheEnabled={true}
      injectedJavaScript={INJECTEDJAVASCRIPT}
      renderLoading={() => (
        // spin loader
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      {...restProps}
    />
  );
};

export default memo(WebViewContainer);
