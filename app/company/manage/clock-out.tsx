import { Alert } from 'react-native';

import QRScanner from '@/components/QRScanner';
import { Router } from '@/scripts/router';

import { useAppSelector } from '@/redux/hooks';
import { setClock } from '@/api/manageController';

const ClockOutScreen = () => {
  const manage = useAppSelector(state => state.companyManage);

  const convertTime = (time: string) => {
    const today = new Date();
    const timeArray = time.split(':');
    today.setHours(Number(timeArray[0]));
    today.setMinutes(Number(timeArray[1]));
    return today.toISOString();
  };

  return (
    <QRScanner
      title="퇴근"
      onScanned={data => {
        const qrData = JSON.parse(data);
        setClock(manage.jobPostId, 'out', {
          memberName: qrData.name,
          memberBirthday: qrData.birthday,
          time: convertTime(manage.clockOutTime),
        }).then(res => {
          if (res) {
            Alert.alert('출근 성공', qrData.name + '님 출근되었습니다.');
            Router.navigate('/company/manage/detail');
          } else {
            Alert.alert('출근 실패', '다시 시도해주세요.');
          }
        });
      }}
    />
  );
};

export default ClockOutScreen;
