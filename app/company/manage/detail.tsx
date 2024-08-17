import { View, TouchableOpacity } from 'react-native';
import { useMemo, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeContainer } from '@/components/Container';
import { ManageButton } from '@/components/Theme/Button';
import SetTimeModal from '@/components/SetTimeModal';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

const DetailScreen = () => {
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState<'in' | 'out'>('in');

  const memoizedSetTimeModal = useMemo(
    () => <SetTimeModal setDisplay={setDisplay} type={type} />,
    [],
  );

  return (
    <SafeContainer>
      <View
        style={{
          height: getSize(197),
          paddingLeft: getSize(48),
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={() => Router.navigate('/company/manage')}>
          <AntDesign name="caretleft" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: getSize(382),
          marginHorizontal: 'auto',
        }}
      >
        <ManageButton
          text="출석"
          onPress={() => {
            Router.push('/company/manage/attendance');
          }}
        />
        <ManageButton
          text="출연자 목록"
          onPress={() => {
            Router.push('/company/manage/applicants');
          }}
        />
        <ManageButton
          text="퇴근"
          onPress={() => {
            setType('out');
            setDisplay(true);
          }}
        />
        <ManageButton
          text="출근"
          onPress={() => {
            setType('in');
            setDisplay(true);
          }}
        />
        <ManageButton
          text="계약서"
          onPress={() => {
            console.log('출석');
          }}
        />
        <ManageButton
          text="의상 컨펌"
          onPress={() => {
            Router.push('/company/manage/clothes');
          }}
        />
        <ManageButton
          text="채팅"
          onPress={() => {
            Router.push('/company/manage/chat');
          }}
        />
      </View>
      {display && memoizedSetTimeModal}
    </SafeContainer>
  );
};

export default DetailScreen;
