import { View } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import { TextWeight900 } from '@/components/Theme/Text';

const ClothesPreviewScreen = () => {
  const params = useLocalSearchParams();
  const uri = params.uri;
  const status = Number(params.status);

  return (
    <BackHeaderContainer
      onPress={() => Router.navigate('/member/manage/clothes')}
      backgroundColor="#000"
    >
      <View
        style={{
          width: '100%',
          height: getSize(493),
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri }}
          style={{
            minWidth: '100%',
            height: '100%',
          }}
        />
      </View>
      <View style={{ marginTop: getSize(51), alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: status ? '#35EB17' : '#656565',
            alignItems: 'center',
            justifyContent: 'center',
            width: getSize(145),
            height: getSize(62),
            borderRadius: getSize(30),
          }}
        >
          <TextWeight900 size={22}>
            {status ? '승인됨' : '승인안됨'}
          </TextWeight900>
        </View>
      </View>
    </BackHeaderContainer>
  );
};

export default ClothesPreviewScreen;
