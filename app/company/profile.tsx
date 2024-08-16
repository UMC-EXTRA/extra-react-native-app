import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { SettingContainer } from '@/components/SettingComponents';
import { Router } from '@/scripts/router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { TextWeight600 } from '@/components/Theme/Text';
import { getCompanyProfile } from '@/api/signController';

import * as Linking from 'expo-linking';
import { initProfile } from '@/redux/slice/profileSlice';
import { useAppDispatch } from '@/redux/hooks';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    name: '',
    url: '',
  });
  const [profileImage, setProfileImage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getCompanyProfile().then(res => {
      if (res !== null) {
        dispatch(
          initProfile({
            name: res.name,
            info: {
              url: res.url,
            },
          }),
        );
        setData({
          name: res.name,
          url: res.url,
        });
      }
    });
  }, []);

  return (
    <SettingContainer
      title="프로필"
      onPress={() => Router.navigate('/company')}
      settingUrl="/company/profile/settings"
    >
      <View
        style={{
          width: getSize(358),
          height: getSize(147),
          paddingHorizontal: getSize(20),
          marginHorizontal: 'auto',
          borderTopLeftRadius: getSize(20),
          borderTopRightRadius: getSize(20),
          backgroundColor: colors.settingBackground,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* profile container */}
        <TouchableOpacity
          style={{
            width: getSize(80),
            height: getSize(80),
            borderRadius: getSize(45),
            backgroundColor: '#D9D9D9',
          }}
          onPress={pickImage}
        >
          {/* profile image */}
          {profileImage && (
            <Image
              source={{ uri: profileImage }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                borderRadius: getSize(80),
              }}
            />
          )}

          {/* profile update icon */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: getSize(30),
              height: getSize(30),
              borderRadius: getSize(15),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#999',
            }}
          >
            <Image
              source={require('@/assets/images/icons/Registration.png')}
              style={{
                width: '70%',
                height: '70%',
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: getSize(60),
            justifyContent: 'space-between',
          }}
        >
          <TextWeight600 size={20}>소속사 : {data.name}</TextWeight600>
          <View style={styles.profileInfoLine}>
            <TextWeight600 size={15}>회사 페이지 : </TextWeight600>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.url);
              }}
            >
              <TextWeight600
                size={15}
                style={{ textDecorationLine: 'underline' }}
              >
                링크
              </TextWeight600>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  profileInfoLine: {
    width: getSize(180),
    flexDirection: 'row',
  },
});

export default ProfileScreen;
