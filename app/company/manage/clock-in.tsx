import QRScanner from '@/components/QRScanner';
import { setMemberClockTime } from '@/redux/manage/companyManageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Alert } from 'react-native';
import { Router } from '@/scripts/router';

const ClockInScreen = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  return (
    <QRScanner
      title="출근"
      onScanned={data => {
        const qrData = JSON.parse(data);
        dispatch(setMemberClockTime({ ...qrData, type: 'in' }));
        Alert.alert('출근', qrData.name + '님 출근 확인되었습니다.', [
          {
            text: '확인',
            onPress: () => Router.navigate('/company/manage/detail'),
          },
        ]);
      }}
    />
  );
};

export default ClockInScreen;
