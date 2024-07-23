import { TouchableOpacity, View, Text } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import * as Permissions from '@/scripts/permission';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState<CameraType>('back');

  const cameraRef = useRef<CameraView>(null);

  const takePictureHandler = async () => {
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) return;

    // takePictureAsync를 통해 사진을 찍습니다.
    // 찍은 사진은 base64 형식으로 저장합니다.
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then(data => {});
  };

  useEffect(() => {
    Permissions.requestCameraPermission().then(result => {
      setHasPermission(result);
    });
  }, []);

  if (!hasPermission) {
    return <View />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1, alignItems: 'center', position: 'relative' }}
          facing={type}
          enableTorch={true}
          ref={cameraRef}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 100,
            }}
            onPress={takePictureHandler}
          >
            <Text style={{ fontSize: 15, color: '#000' }}>찍기</Text>
          </TouchableOpacity>
        </CameraView>
      </View>
    );
  }
};

export default CameraScreen;
