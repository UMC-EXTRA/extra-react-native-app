import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { SafeContainer } from '@/components/Container';
import { MainText } from '@/components/FormComponents';
import getSize from '@/scripts/getSize';

import * as Permissions from '@/scripts/permission';

interface QRScannerProps {
  title: string;
  onScanned: (data: string) => void;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const QRScanner = ({ title, onScanned }: QRScannerProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanAreaLayout, setScanAreaLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const scanAreaRef = useRef(null);

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
        onScanned(data);
        router.back();
      }
    }
  };

  useEffect(() => {
    Permissions.requestCameraPermission().then(result => {
      setHasPermission(result);
    });
  }, []);

  return (
    <SafeContainer style={{ alignItems: 'stretch' }}>
      <View style={styles.scannerHeader}>
        <MainText>{title}</MainText>
        <TouchableOpacity onPress={() => router.back()}>
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
            onBarcodeScanned={scanQRCodeHandler}
          >
            <View
              style={styles.scanArea}
              onLayout={onScanAreaLayout}
              ref={scanAreaRef}
            >
              <Ionicons name="scan" size={getSize(300)} color="white" />
              <MainText style={styles.scanDescription}>(QR코드 인식)</MainText>
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
