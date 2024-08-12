import { View } from 'react-native';

import { SafeContainer } from '@/components/Container';
import { ConfirmButton } from '@/components/Theme/Button';
import { MainText } from '@/components/Theme/Text';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { initType } from '@/redux/slice/profileSlice';
import { useAppDispatch } from '@/redux/hooks';

// sign in/up first page
const MemberScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeContainer style={{ alignItems: 'center' }}>
      <View style={{ flex: 24, justifyContent: 'flex-end' }}>
        <MainText size={29} height={41}>
          어서오세요!{'\n'}원하시는 서비스를 선택해주세요
        </MainText>
      </View>
      <View
        style={{
          flex: 76,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* select '보조출연자' */}
        <ConfirmButton
          onPress={() => {
            dispatch(initType('member'));
            Router.push('/sign/login');
          }}
          style={{ marginBottom: getSize(20) }}
          text="보조출연자"
        />
        {/* select '업체' */}
        <ConfirmButton
          onPress={() => {
            dispatch(initType('company'));
            Router.push('/sign/login');
          }}
          text="관리자"
        />
      </View>
    </SafeContainer>
  );
};

export default MemberScreen;
