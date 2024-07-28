import QRScanner from '@/components/QRScanner';
import { isCompanyManageState } from '@/redux/manage/stateTypes';
import { setMemberClockTime } from '@/redux/manage/manageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

const ClockInScreen = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  return (
    <QRScanner
      title="출근"
      onScanned={data => {
        if (isCompanyManageState(manage)) {
          const qrData = JSON.parse(data);
          dispatch(setMemberClockTime({ ...qrData, type: 'in' }));
        }
        console.log(data);
      }}
    />
  );
};

export default ClockInScreen;
