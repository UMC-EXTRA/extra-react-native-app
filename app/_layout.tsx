import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import colors from '@/constants/Colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.headerBackground} />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  );
}
