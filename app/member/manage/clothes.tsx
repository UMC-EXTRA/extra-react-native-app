import { View, StyleSheet, Text } from 'react-native';
import { Router } from '@/scripts/router';

import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import { weight900 } from '@/components/Theme/Text';

const ClothesScreen = () => {
  const role = '형사';
  const season = '겨울';
  const description = '회색옷';

  return (
    <BackHeaderContainer
      title="의상"
      onPress={() => Router.navigate('/member/manage/detail')}
    >
      <View
        style={{
          marginHorizontal: 'auto',
          width: getSize(392),
          height: getSize(226),
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: '#2A2A2A',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>역할: </Text>
          <View style={styles.textUnderline}>
            <Text style={styles.text}>{role}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>계절: </Text>
          <View style={styles.textUnderline}>
            <Text style={styles.text}>{season}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>상세설명: </Text>
          <View style={styles.textUnderline}>
            <Text style={styles.text}>{description}</Text>
          </View>
        </View>
      </View>
    </BackHeaderContainer>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: getSize(30),
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: getSize(20),
  },
  text: {
    ...weight900,
    fontSize: getSize(16),
    letterSpacing: 0.16,
  },
  textUnderline: {
    marginLeft: 10,
    width: getSize(109),
    alignItems: 'center',
    borderBottomColor: '#585858',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});

export default ClothesScreen;
