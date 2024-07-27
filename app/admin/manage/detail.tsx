import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeContainer } from '@/components/Container';
import { ManageButton } from '@/components/ButtonComponents';
import getSize from '@/scripts/getSize';

const DetailScreen = () => {
  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/admin/manage')}>
          <AntDesign name="caretleft" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <ManageButton
          text="출석"
          onPress={() => {
            router.push('/admin/manage/attendance');
          }}
        />
        <ManageButton
          text="출연자 목록"
          onPress={() => {
            router.push('/admin/manage/user-list');
          }}
        />
        <ManageButton
          text="퇴근"
          onPress={() => {
            router.push('/admin/manage/clock-out');
          }}
        />
        <ManageButton
          text="출근"
          onPress={() => {
            router.push('/admin/manage/clock-in');
          }}
        />
        <ManageButton
          text="계약서"
          onPress={() => {
            console.log('출석');
          }}
        />
        <ManageButton
          text="의상 컨펌"
          onPress={() => {
            console.log('출석');
          }}
        />
        <ManageButton
          text="채팅"
          onPress={() => {
            console.log('출석');
          }}
        />
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: getSize(197),
    paddingLeft: getSize(48),
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: getSize(24),
  },
});

export default DetailScreen;
