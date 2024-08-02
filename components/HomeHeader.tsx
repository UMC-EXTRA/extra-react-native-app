import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
//   useForeground,
// } from 'react-native-google-mobile-ads';

import getSize from '@/scripts/getSize';

interface HomeHeaderProps {
  adUnitId?: string;
}

// const adUnitId = __DEV__ && TestIds.ADAPTIVE_BANNER;

const HomeHeader: React.FC<HomeHeaderProps> = ({ adUnitId }) => {
  // const bannerRef = useRef<BannerAd>(null);
  // const unitId =
  //   adUnitId ??
  //   Platform.select({
  //     ios: `${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_IOS_ADS_ID}`,
  //     android: `${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_ANDROID_ADS_ID}`,
  //   });

  // useForeground(() => {
  //   Platform.OS === 'ios' && bannerRef.current?.load();
  // });

  return (
    <View style={styles.header}>
      <View style={styles.menuContainer}>
        <Text style={styles.title}>EXTRA</Text>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('@/assets/images/icons/Ball.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bannerAds}>
        {/* <BannerAd
          ref={bannerRef}
          unitId={unitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(261),
  },
  menuContainer: {
    marginTop: getSize(112),
    height: getSize(37),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: getSize(24),
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '900',
    color: '#fff',
  },
  image: {
    width: getSize(34),
    height: getSize(34),
  },
  bannerAds: {
    height: getSize(86),
    marginTop: getSize(26),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#9a9a9a',
  },
});

export default HomeHeader;
