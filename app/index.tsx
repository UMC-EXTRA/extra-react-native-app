import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Redirect, Href } from 'expo-router';
import { useFonts } from 'expo-font';
import { initKakao } from '@/api/utils';

initKakao();

const Index = () => {
  // load font
  const [loaded, error] = useFonts({
    'Inter-Black': require('@/assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('@/assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('@/assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('@/assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
    Inter: require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('@/assets/fonts/Inter-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Redirect href={'/sign' as Href} />;
};

export default Index;
