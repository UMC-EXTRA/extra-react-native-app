import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { getKeyHashAndroid } from '@react-native-kakao/core';

const Index = () => {
  useEffect(() => {
    getKeyHashAndroid().then(console.log);
  }, []);

  return <Redirect href="/member" />;
};

export default Index;
