import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import getSize from '@/scripts/getSize';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{ width: '100%', height: getSize(261), backgroundColor: '#000' }}
      ></View>
      <WebView
        source={{ uri: 'https://extra-react-webview.vercel.app/' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});
