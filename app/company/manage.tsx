import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useCallback, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeContainer } from '@/components/Container';
import { MainText } from '@/components/TextComponents';
import CustomWebView from '@/components/CustomWebView';
import getSize from '@/scripts/getSize';
import { AntDesign } from '@expo/vector-icons';

import { initManageState, setNoticeId } from '@/redux/manage/manageSlice';
import { useAppDispatch } from '@/redux/hooks';

const ManageScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    dispatch(setNoticeId(data.noticeId));
    router.push('/company/manage/detail');
  }, []);

  useEffect(() => {
    dispatch(initManageState({ type: 'company' }));
  }, []);

  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backLinkButton}
          onPress={() => router.navigate('/company')}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText style={{ fontSize: getSize(30) }}>현장 관리</MainText>
        <View style={styles.diviedBar} />
      </View>
      <MainText
        style={{
          marginTop: getSize(38),
          marginBottom: getSize(44),
          marginLeft: getSize(32),
          textAlign: 'left',
        }}
      >
        촬영 목록
      </MainText>
      <CustomWebView
        uri="https://extra-react-webview.vercel.app"
        onMessage={onMessage}
      />
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(113),
    paddingHorizontal: getSize(35),
    flexDirection: 'row',
    alignItems: 'center',
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
