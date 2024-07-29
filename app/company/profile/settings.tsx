import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeContainer } from '@/components/Container';
import { MainText } from '@/components/TextComponents';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import getSize from '@/scripts/getSize';

const SettingsScreen = () => {
  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/profile')}>
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText style={{ fontSize: getSize(32), marginLeft: getSize(34) }}>
          설정
        </MainText>
      </View>
      <ScrollView></ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(168),
    paddingTop: getSize(92),
    paddingLeft: getSize(46),
    flexDirection: 'row',
  },
});

export default SettingsScreen;
