import { View, TouchableOpacity } from 'react-native';
import { useMemo, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeContainer } from '@/components/Container';
import { ManageButton } from '@/components/Theme/Button';
import SetTimeModal from '@/components/SetTimeModal';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { initMemberList } from '@/redux/manage/companyManageSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

const DetailScreen = () => {
  const dispatch = useAppDispatch();

  const [display, setDisplay] = useState(false);
  const [type, setType] = useState<'in' | 'out'>('in');

  const memberData = [
    {
      id: 1,
      name: '김철수',
      role: '학생',
      sex: true,
      age: 25,
      clockIn: true,
      clockOut: false,
      clockInTime: '09:00',
      clockOutTime: '',
      isConfirmed: false,
      inChat: false,
    },
    {
      id: 2,
      name: '이영희',
      role: '교수',
      sex: false,
      age: 45,
      clockIn: true,
      clockOut: false,
      clockInTime: '09:00',
      clockOutTime: '',
      isConfirmed: false,
      inChat: false,
    },
    {
      id: 3,
      name: '박민수',
      role: '학생',
      sex: true,
      age: 22,
      clockIn: false,
      clockOut: false,
      clockInTime: '',
      clockOutTime: '',
      isConfirmed: false,
      inChat: false,
    },
    {
      id: 4,
      name: '홍길동',
      role: '교수',
      sex: true,
      age: 35,
      clockIn: true,
      clockOut: false,
      clockInTime: '09:00',
      clockOutTime: '',
      isConfirmed: false,
      inChat: false,
    },
  ];

  useEffect(() => {
    dispatch(initMemberList({ members: memberData }));
  }, []);

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
