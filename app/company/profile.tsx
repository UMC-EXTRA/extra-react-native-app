import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { SettingContainer } from '@/components/SettingComponents';
import { Router } from '@/scripts/router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

const ProfileScreen = () => {
  const name = '박지민';
  const sex = 1;
  const companyName = '탑소와';
  const age = 24;

  return (
    <SettingContainer
      title="프로필"
      onPress={() => Router.navigate('/company')}
    >
      <View style={styles.mainProfileContainer}>
        <TouchableOpacity
          onPress={() => Router.push('/company/profile/settings')}
        >
          <Image
            source={require('@/assets/images/icons/Registration.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileMainText}>이름 : {name}</Text>
          <View style={styles.profileInfoLine}>
            <Text style={styles.profileInfoText}>
              성별 : {sex ? '남' : '여'}
            </Text>
            <Text style={styles.profileInfoText}>소속사 : {companyName}</Text>
          </View>
          <View style={styles.profileInfoLine}>
            <Text style={styles.profileInfoText}>나이 : {age}세</Text>
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
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    fontSize: getSize(18),
  },
  profileMainText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontWeight: '600',
    fontSize: getSize(22),
  },
  profileInfoLine: {
    width: getSize(180),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
