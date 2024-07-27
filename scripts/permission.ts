import { Alert, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as IntentLauncher from 'expo-intent-launcher';

export function alertForOpeningSettings(title: string, message: string) {
  Alert.alert(title, message, [
    { text: '취소', style: 'cancel' },
    { text: '설정으로 이동', onPress: openSettings },
  ]);
}

export async function requestPushNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return false;
  }
  return true;
}

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alertForOpeningSettings(
      '권한 필요',
      '이 앱을 사용하기 위해서는 위치 권한이 필요합니다. 설정에서 권한을 활성화해주세요.',
    );
    return false;
  }
  return true;
}

export async function requestCameraPermission(): Promise<boolean> {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alertForOpeningSettings(
      '권한 필요',
      '해당 기능은 카메라 권한이 필요합니다. 설정에서 권한을 활성화해주세요.',
    );
    return false;
  }
  return true;
}

export async function togglePushNotificationPermission(
  isEnabled: boolean,
): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();

  if (isEnabled) {
    if (status != 'granted') {
      return true;
    }
    alertForOpeningSettings(
      '알림 비활성화',
      '알림을 비활성화하려면 설정에서 수동으로 변경해야 합니다. 설정으로 이동하시겠습니까?',
    );
    return false;
  } else {
    if (status == 'granted') {
      return true;
    }
    alertForOpeningSettings(
      '알림 활성화',
      '알림을 활성화하려면 설정에서 수동으로 변경해야 합니다. 설정으로 이동하시겠습니까?',
    );
    return false;
  }
}

function openSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    const packageName =
      Constants.manifest?.android?.package ||
      Constants.manifest2?.android?.package;
    if (packageName) {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
        { data: 'package:' + packageName },
      );
    } else {
      console.error('Cannot find package name for Android');
      // 패키지 이름을 찾을 수 없는 경우에 대한 대체 처리
    }
  }
}
