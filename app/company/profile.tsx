import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { SettingContainer } from '@/components/SettingComponents';
import { Router } from '@/scripts/router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { weight600 } from '@/components/Theme/Text';

const ProfileScreen = () => {
  const [data, setData] = useState({
    name: '',
    sex: 0,
    companyName: '',
    age: 0,
  });

  useEffect(() => {
    setData({
      name: '박지민',
      sex: 1,
      companyName: '탑소와',
      age: 24,
    });
  }, []);

  return (
    <SettingContainer
      title="프로필"
      onPress={() => Router.navigate('/company')}
      settingUrl="/company/profile/settings"
    >
      <View style={styles.mainProfileContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('@/assets/images/icons/Registration.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileMainText}>이름 : {data.name}</Text>
          <View style={styles.profileInfoLine}>
            <Text style={styles.profileInfoText}>
              성별 : {data.sex === 1 ? '남' : data.sex === 2 ? '여' : ''}
            </Text>
            <Text style={styles.profileInfoText}>
              소속사 : {data.companyName}
            </Text>
          </View>
          <View style={styles.profileInfoLine}>
            <Text style={styles.profileInfoText}>나이 : {data.age}세</Text>
          </View>
        </View>
      </View>
    </SettingContainer>
  );
};

const styles = StyleSheet.create({
  mainProfileContainer: {
    width: getSize(358),
    height: getSize(147),
    padding: getSize(33),
    marginHorizontal: 'auto',
    borderTopLeftRadius: getSize(20),
    borderTopRightRadius: getSize(20),
    backgroundColor: colors.settingBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: getSize(80),
    height: getSize(80),
    marginRight: getSize(30),
  },
  profileInfo: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  profileInfoText: {
    ...weight600,
    fontSize: getSize(15),
  },
  profileMainText: {
    ...weight600,
    fontSize: getSize(20),
  },
  profileInfoLine: {
    width: getSize(180),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
