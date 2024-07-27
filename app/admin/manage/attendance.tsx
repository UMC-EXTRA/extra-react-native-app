import QRScanner from '@/components/QRScanner';

const AttendanceScreen = () => {
  return (
    <QRScanner
      title="출석"
      onScanned={data => {
        console.log(data);
      }}
    />
  );
};

export default AttendanceScreen;
