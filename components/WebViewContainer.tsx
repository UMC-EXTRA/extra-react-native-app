import { useRef, useEffect, useCallback, useState, memo } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Router } from '@/scripts/router';
import {
  WebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import { createHmacSignature, getToken } from '@/api/utils';
import { encryptAccessToken } from '../api/utils';

export type MessageType = {
  type: string;
  payload?: object;
  version: string;
};

interface WebViewContainerProps extends Omit<WebViewProps, 'onMessage'> {
  uri?: string;
  onMessage?: (data: MessageType) => void;
  dataForWebView?: MessageType;
  history?: string;
  injectedJavaScript?: string;
}

const WebViewContainer = ({
  uri = '',
  onMessage,
  dataForWebView,
  history = '',
  injectedJavaScript = '',
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
      case 'REQUEST_AUTHORIZATION':
        getToken()
          .then(res => {
            if (res !== null) {
              const accessToken = res.accessToken;
              const { iv, encryptedData } = encryptAccessToken(accessToken);
              const signature = createHmacSignature(encryptedData);
              sendMessage({
                type: 'AUTHORIZATION',
                payload: {
                  iv,
                  encryptedData,
                  signature,
                },
                version: '1.0',
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
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
      console.log(dataForWebView);
      sendMessage(dataForWebView);
    }
  }, [dataForWebView]);

  const INJECTEDJAVASCRIPT = `
    const metaList = [
      {'name': 'viewport', 'content': 'initial-scale=1.0, maximum-scale=1.0'},
      {'http-equiv': 'X-Frame-Options', 'content': 'deny'},
      {'http-equiv': 'X-Content-Type-Options', 'content': 'nosniff'},
      {'http-equiv': 'Referrer-Policy', 'content': 'no-referrer'},
    ]
    const metaElements = Array.from({length: 4}, () => document.createElement('meta'));

    metaElements.forEach((element, index) => {
      Object.entries(metaList[index]).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      document.getElementsByTagName('head')[0].appendChild(element);
    });
    ${injectedJavaScript}
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
