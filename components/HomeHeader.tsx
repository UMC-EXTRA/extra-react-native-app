import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
//import { initializeAdMob } from '@/scripts/initAds';
//import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

import { useState, useEffect } from 'react';

import getSize from '@/scripts/getSize';

const HomeHeader = () => {
  const [AdLoading, setAdLoading] = useState(true);

  useEffect(() => {
    // initializeAdMob().then(() => {
    //   console.log('성공');
    //   setAdLoading(false);
    // })
  }, []);
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
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
          광고
        </Text>
        {/* {!AdLoading && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />} */}
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
