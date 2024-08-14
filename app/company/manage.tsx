import { View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { MainContainer } from '@/components/Container';
import { MainText } from '@/components/Theme/Text';
import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { initManageState, setJobPostId } from '@/redux/manage/manageSlice';
import { useAppDispatch } from '@/redux/hooks';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_MANAGE') {
      const typedData = data as MessageType & {
        payload: {
          job_post_id: number;
        };
      };
      dispatch(setJobPostId(typedData.payload.job_post_id));
      Router.push('/company/manage/detail');
    }
  };

  useEffect(() => {
    dispatch(initManageState({ type: 'company' }));
  }, []);

  return (
    <MainContainer>
      <View
        style={{
          width: '100%',
          height: getSize(173),
          paddingHorizontal: getSize(35),
          paddingBottom: getSize(29),
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: getSize(11),
            marginRight: getSize(22.45),
          }}
          onPress={() => Router.navigate(`/company`)}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText size={30} spacing={0.3}>
          현장 관리
        </MainText>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            marginHorizontal: getSize(35),
            height: getSize(1),
            backgroundColor: 'white',
          }}
        />
      </View>
      <MainText
        spacing={0.2}
        align="left"
        style={{
          marginTop: getSize(38),
          marginBottom: getSize(44),
          marginLeft: getSize(32),
        }}
      >
        촬영 목록
      </MainText>
      <WebViewContainer uri="/company/manage" onMessage={onMessage} />
    </MainContainer>
  );
};

export default ManageScreen;
