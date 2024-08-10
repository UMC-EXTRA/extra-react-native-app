import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { Router } from '@/scripts/router';
import { SafeContainer } from '@/components/Container';
import { MainText } from '@/components/Theme/Text';
import getSize from '@/scripts/getSize';

import * as Permissions from '@/scripts/permission';

interface QRScannerProps {
  title: string;
  onScanned: (data: string) => void;
  onPress?: () => void;
}

const QRScanner = ({
  title,
  onScanned,
  onPress = () => Router.navigate('/company/manage/detail'),
}: QRScannerProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanAreaLayout, setScanAreaLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const scanAreaRef = useRef<View>(null);

  const onScanAreaLayout = () => {
    if (!hasPermission) return;
    if (!scanAreaRef.current) return;
    scanAreaRef.current.measure((x, y, width, height, pageX, pageY) => {
      setScanAreaLayout({ x: pageX, y: pageY, width, height });
    });
  };

  const scanQRCodeHandler = ({ bounds, data }: BarcodeScanningResult) => {
    if (scanAreaLayout) {
      const { origin, size } = bounds;
      const qrCodeCenterX = origin.x + size.width / 2;
      const qrCodeCenterY = origin.y + size.height / 2;

      if (
        qrCodeCenterX >= scanAreaLayout.x &&
        qrCodeCenterX <= scanAreaLayout.x + scanAreaLayout.width &&
        qrCodeCenterY >= scanAreaLayout.y &&
        qrCodeCenterY <= scanAreaLayout.y + scanAreaLayout.height
      ) {
        setScanned(true);
        onScanned(data);
      }
    }
  };

  useEffect(() => {
    Permissions.requestCameraPermission().then(result => {
      setHasPermission(result);
    });
  }, []);

  return (
    <SafeContainer>
      <View style={styles.scannerHeader}>
        <MainText spacing={0.2}>{title}</MainText>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('@/assets/images/icons/Multiply.png')}
            style={{ width: getSize(31), height: getSize(31) }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        {hasPermission && (
          <CameraView
            facing="front"
            style={styles.cameraView}
            autofocus="on"
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={scanned ? undefined : scanQRCodeHandler}
          >
            <View
              style={styles.scanArea}
              onLayout={onScanAreaLayout}
              ref={scanAreaRef}
            >
              <Ionicons name="scan" size={getSize(300)} color="white" />
              <MainText spacing={0.24} style={styles.scanDescription}>
                (QR코드 인식)
              </MainText>
            </View>
          </CameraView>
        )}
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  scannerHeader: {
    width: '100%',
    height: getSize(58),
    backgroundColor: '#302E34',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize(20),
  },
  cameraContainer: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: getSize(300),
    height: getSize(300),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanDescription: {
    fontSize: getSize(24),
    position: 'absolute',
    bottom: -getSize(62),
  },
});

export default QRScanner;
