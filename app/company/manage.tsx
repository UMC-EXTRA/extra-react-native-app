import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useCallback, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { MainContainer } from '@/components/Container';
import { MainText } from '@/components/Theme/Text';
import WebViewContainer from '@/components/WebViewContainer';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';

import { initManageState, setJobPostId } from '@/redux/manage/manageSlice';
import { useAppDispatch } from '@/redux/hooks';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event: any) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data);
    if (type === 'NAVIGATION') {
      dispatch(setJobPostId(payload.params.job_post_id));
      Router.push(payload);
    }
  }, []);

  useEffect(() => {
    dispatch(initManageState({ type: 'company' }));
  }, []);

  return (
    <MainContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backLinkButton}
          onPress={() => Router.navigate(`/company`)}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText size={30} spacing={0.3}>
          현장 관리
        </MainText>
        <View style={styles.diviedBar} />
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
      <WebViewContainer uri="" onMessage={onMessage} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(173),
    paddingHorizontal: getSize(35),
    paddingBottom: getSize(29),
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
  },
  diviedBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginHorizontal: getSize(35),
    height: getSize(1),
    backgroundColor: 'white',
  },
  backLinkButton: {
    marginLeft: getSize(11),
    marginRight: getSize(22.45),
  },
});

export default ManageScreen;
