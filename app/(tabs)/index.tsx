import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <WebView
        source={{ uri: 'https://extra-react-webview.vercel.app/' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
