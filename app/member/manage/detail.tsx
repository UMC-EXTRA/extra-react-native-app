import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { BackHeaderContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import { TextWeight900 } from '@/components/Theme/Text';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initProfile, isMemberProfileState } from '@/redux/slice/profileSlice';
import { getMemberProfile } from '@/api/signController';

const DetailScreen = () => {
  const profile = useAppSelector(state => state.profile);
  const title = useAppSelector(state => state.memberManage.title);
  const dispatch = useAppDispatch();
  const [isLoadingQR, setIsLoadingQR] = useState(false);
  const [QRData, setQRData] = useState('');

  useEffect(() => {
    if (profile.name === '') {
      getMemberProfile().then(res => {
        if (res !== null) {
          setQRData(
            JSON.stringify({
              name: res.name,
              birthday: res.birthday,
            }),
          );

          dispatch(
            initProfile({
              name: res.name,
              info: {
                birthday: res.birthday,
                home: res.home,
                introduction: res.introduction,
                license: res.license,
                pros: res.pros,
                height: res.height,
                weight: res.weight,
                tattoo: res.tattoo,
              },
            }),
          );
          setIsLoadingQR(true);
        }
      });
    } else {
      if (isMemberProfileState(profile)) {
        setQRData(
          JSON.stringify({
            name: profile.name,
            birthday: profile.info.birthday,
          }),
        );
        setIsLoadingQR(true);
      }
    }
  }, []);

  return (
    <BackHeaderContainer
      title={title}
      onPress={() => Router.replace('/member/manage')}
    >
      <View style={styles.QRContainer}>
        {isLoadingQR && (
          <QRCode
            size={getSize(150)}
            value={QRData}
            color="white"
            backgroundColor="black"
          />
        )}
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => Router.push('/member/manage/chat')}
        >
          <TextWeight900 size={22} height={28}>
            채팅방
          </TextWeight900>
          <FontAwesome
            name="angle-right"
            size={25}
            color="white"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => Router.push('/member/manage/clothes')}
        >
          <TextWeight900 size={22} height={28}>
            의상
          </TextWeight900>
          <FontAwesome
            name="angle-right"
            size={25}
            color="white"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer}>
          <TextWeight900 size={22} height={28}>
            계약서
          </TextWeight900>
          <FontAwesome
            name="angle-right"
            size={25}
            color="white"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
    </BackHeaderContainer>
  );
};

const styles = StyleSheet.create({
  QRContainer: {
    height: getSize(305),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
  },
  menuContainer: {
    width: getSize(363),
    height: getSize(81),
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#848484',
    marginBottom: getSize(31),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    position: 'absolute',
    right: getSize(27),
  },
});

export default DetailScreen;
