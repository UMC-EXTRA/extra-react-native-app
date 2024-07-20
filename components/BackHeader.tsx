import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

interface Props {
  title: string | null;
  onPress?: () => void;
}

const BackHeader = ({ title = null, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <FontAwesome name="angle-left" size={getSize(40)} color="white" />
      </TouchableOpacity>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: getSize(60),
    justifyContent: 'center',
    height: getSize(155),
    width: '100%',
    backgroundColor: colors.headerBackground,
    position: 'relative',
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: getSize(60),
    height: getSize(95),
    paddingLeft: getSize(34),
    width: getSize(100),
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: getSize(24),
    fontWeight: '900',
    fontFamily: 'Inter',
    color: 'white',
    textAlign: 'center',
    lineHeight: getSize(95),
  },
});

export default BackHeader;
