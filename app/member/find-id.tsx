import { Text } from 'react-native';
import { useNavigation, router } from 'expo-router';
import { useEffect } from 'react';
import SafeContainer from '@/components/SafeContainer';
import BackHeader from '@/components/BackHeader';

const FindIdScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => <BackHeader />,
    });
  }, [navigation]);

  return (
    <SafeContainer>
      <Text>Find ID</Text>
    </SafeContainer>
  );
};

export default FindIdScreen;
