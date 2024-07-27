import QRScanner from '@/components/QRScanner';

const ClockInScreen = () => {
  return (
    <QRScanner
      title="출석"
      onScanned={data => {
        console.log(data);
      }}
    />
  );
};

export default ClockInScreen;
