import QRScanner from '@/components/QRScanner';

const ClockOutScreen = () => {
  return (
    <QRScanner
      title="퇴근"
      onScanned={data => {
        console.log(data);
      }}
    />
  );
};

export default ClockOutScreen;
