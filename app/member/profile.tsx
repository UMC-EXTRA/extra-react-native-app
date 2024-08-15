import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { SettingContainer } from '@/components/SettingComponents';
import { Router } from '@/scripts/router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { TextWeight600 } from '@/components/Theme/Text';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { initProfile, isMemberProfileState } from '@/redux/slice/profileSlice';
import { getMemberProfile } from '@/api/signController';

const ProfileScreen = () => {
  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    name: '',
    sex: true,
    age: 0,
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

  const getAge = (birth: string) => {
    const today = new Date();
    const birthDate = new Date(birth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (profile.name === '') {
      getMemberProfile().then(res => {
        if (res !== null) {
          setData({
            name: res.name,
            sex: res.sex,
            age: getAge(res.birthday),
          });

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
                tattoo: {
                  face: res.face,
                  back: res.back,
                  arm: res.arm,
                  leg: res.leg,
                  hand: res.hand,
                  shoulder: res.shoulder,
                  chest: res.chest,
                  feet: res.feet,
                  etc: res.etc,
                },
              },
            }),
          );
        }
      });
    } else {
      if (isMemberProfileState(profile)) {
        setData({
          name: profile.name,
          sex: profile.info.sex,
          age: getAge(profile.info.birthday),
        });
      }
    }
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
            height: getSize(82),
            justifyContent: 'space-between',
          }}
        >
          <TextWeight600 size={20}>이름 : {data.name}</TextWeight600>
          <View style={styles.profileInfoLine}>
            <TextWeight600 size={15}>
              성별 : {data.sex ? '남' : '여'}
            </TextWeight600>
          </View>
          <View style={styles.profileInfoLine}>
            <TextWeight600 size={15}>나이 : {data.age}세</TextWeight600>
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
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
