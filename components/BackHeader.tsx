import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

const BackHeader = () => {
  return (
    <View
      style={{
        paddingTop: getSize(60),
        paddingLeft: getSize(34),
        justifyContent: 'center',
        height: getSize(155),
        backgroundColor: colors.headerBackground,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="angle-left" size={getSize(40)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
