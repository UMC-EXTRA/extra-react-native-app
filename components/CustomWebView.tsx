import { forwardRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface CustomWebViewProps {
  uri: string;
  onMessage: (event: WebViewMessageEvent) => void;
}

const CustomWebView = forwardRef<WebView, CustomWebViewProps>(
  ({ uri, onMessage, ...restProps }, ref) => {
    return (
      <WebView
        // 아래 링크를 수정하세요.
        ref={ref}
        source={{ uri }}
        style={styles.webview}
        onMessage={onMessage}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        {...restProps}
      />
    );
  },
);

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

export default CustomWebView;
