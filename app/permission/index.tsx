import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

import colors from '@/constants/Colors';
import { Container } from '@/components/Container';

import * as Permissions from '@/scripts/permission';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const RequestButton = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text} 권한 요청</Text>
    </TouchableOpacity>
  );
};

const PermissionTestScreen = () => {
  const [isPushNotificationAllowed, setIsPushNotificationAllowed] =
    useState(false);

  return (
    <Container style={{ justifyContent: 'center' }}>
      <RequestButton
        text="카메라"
        onPress={() => {
          Permissions.requestCameraPermission().then(result => {
            if (result) {
              console.log('카메라 권한 허용');
            } else {
              console.log('카메라 권한 거부');
            }
          });
        }}
      />
      <RequestButton
        text="위치"
        onPress={() => {
          Permissions.requestLocationPermission().then(result => {
            if (result) {
              console.log('위치 권한 허용');
            } else {
              console.log('위치 권한 거부');
            }
          });
        }}
      />
      <RequestButton
        text="푸시 알림"
        onPress={() => {
          Permissions.requestPushNotificationPermission().then(result => {
            if (result) {
              console.log('푸시 알림 권한 허용');
            } else {
              console.log('푸시 알림 권한 거부');
            }
          });
        }}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>알림 허용</Text>
        <TouchableOpacity
          style={{
            ...styles.checkButton,
            backgroundColor: isPushNotificationAllowed
              ? colors.highlight
              : '#000',
          }}
          onPress={() => {
            Permissions.togglePushNotificationPermission(
              isPushNotificationAllowed,
            ).then(result => {
              if (result) {
                setIsPushNotificationAllowed(!isPushNotificationAllowed);
              }
            });
          }}
        />
      </View>
      <RequestButton
        text="카메라 켜기"
        onPress={() => {
          router.push('/user/manage/camera');
        }}
      />
      <QRCode
        value="name:이건, 나이:24"
        color="white"
        backgroundColor="black"
      />
      <RequestButton
        text="QR 스캔"
        onPress={() => {
          router.push('/admin/manage/clockIn');
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
  },
  text: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    height: 30,
    width: 200,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  checkButton: {
    width: 30,
    height: 30,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.highlight,
    borderRadius: 15,
  },
});

export default PermissionTestScreen;
