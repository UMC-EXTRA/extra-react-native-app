import { View } from 'react-native';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';

const DetailScreen = () => {
  const title = 'umc 공고';

  return (
    <BackHeaderContainer
      title={title}
      onPress={() => Router.replace('/member/manage')}
    >
      <View></View>
    </BackHeaderContainer>
  );
};

export default DetailScreen;
