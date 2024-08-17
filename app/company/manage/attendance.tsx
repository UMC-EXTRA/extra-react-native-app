import { Alert } from 'react-native';

import QRScanner from '@/components/QRScanner';
import { Router } from '@/scripts/router';

import { useAppSelector } from '@/redux/hooks';
import { setAttendance } from '@/api/manageController';

const AttendanceScreen = () => {
  const manage = useAppSelector(state => state.companyManage);

  return (
    <QRScanner
      title="출석"
      onScanned={data => {
        const qrData = JSON.parse(data);
        setAttendance(manage.jobPostId, {
          memberName: qrData.name,
          memberBirthday: qrData.birthday,
        }).then(res => {
          if (res) {
            Alert.alert('출석 성공', qrData.name + '님 출석되었습니다.');
            Router.navigate('/company/manage/detail');
          } else {
            Alert.alert('인식 실패', '다시 시도해주세요.');
          }
        });
      }}
    />
  );
};

export default AttendanceScreen;
