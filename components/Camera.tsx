import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CameraView, FlashMode, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { SafeContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import * as Permissions from '@/scripts/permission';

interface CameraProps {
  backLink: string;
  onConfirm: () => void;
}

const Camera = ({ backLink, onConfirm }: CameraProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [flash, setFlash] = useState<FlashMode>('off');
  const [type, setType] = useState<CameraType>('back');

  const cameraRef = useRef<CameraView>(null);

  const resetCamera = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  const takePictureHandler = async () => {
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) return;

    // takePictureAsync를 통해 사진을 찍습니다.
    // 찍은 사진은 base64 형식으로 저장합니다.
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then(data => {
        setPreviewVisible(true);
        setCapturedImage(data);
      });
  };

  useEffect(() => {
    Permissions.requestCameraPermission().then(result => {
      setHasPermission(result);
    });
  }, []);

  return (
    <SafeContainer style={{ alignItems: 'stretch' }}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            setType(type === 'back' ? 'front' : 'back');
          }}
        >
          <MaterialIcons
            name="flip-camera-android"
            size={getSize(35)}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            setFlash(flash === 'off' ? 'on' : 'off');
          }}
        >
          <Ionicons
            name={flash === 'off' ? 'flash-off' : 'flash'}
            size={getSize(35)}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            resetCamera();
            Router.navigate(backLink);
          }}
        >
          <Image
            source={require('@/assets/images/icons/Multiply.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
      {hasPermission &&
        (previewVisible && capturedImage ? (
          <View style={styles.cameraView}>
            <Image
              source={{ uri: capturedImage.uri }}
              style={{ width: '100%', height: '100%' }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  ...styles.cameraButton,
                  marginRight: getSize(20),
                }}
                onPress={() => {
                  setPreviewVisible(false);
                  setCapturedImage(null);
                }}
              >
                <Image
                  source={require('@/assets/images/icons/Camera-black.png')}
                  style={styles.takeButtonImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => {
                  resetCamera();
                  onConfirm();
                }}
              >
                <Feather name="upload" size={getSize(25)} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CameraView
            style={styles.cameraView}
            facing={type}
            enableTorch={true}
            ref={cameraRef}
            autofocus="on"
            flash={flash}
          >
            <View
              style={{
                ...styles.buttonContainer,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePictureHandler}
              >
                <Image
                  source={require('@/assets/images/icons/Camera-black.png')}
                  style={styles.takeButtonImage}
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        ))}
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: getSize(60),
    marginBottom: getSize(28),
    marginHorizontal: getSize(32),
    height: getSize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: getSize(40),
    height: getSize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: getSize(35),
    height: getSize(35),
  },
  cameraView: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 1,
    height: '60%',
    marginHorizontal: getSize(24),
    marginBottom: getSize(28),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: getSize(60),
    width: '50%',
  },
  cameraButton: {
    backgroundColor: 'white',
    width: getSize(60),
    height: getSize(60),
    borderRadius: getSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeButtonImage: {
    width: getSize(35),
    height: getSize(35),
  },
});

export default Camera;
