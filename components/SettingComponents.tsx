import { FC, ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Router } from '@/scripts/router';

import { SafeContainer } from '@/components/Container';
import {
  MainText,
  TextWeight400,
  TextWeight600,
} from '@/components/Theme/Text';

import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface SettingContainerProps {
  children: ReactNode;
  title: string;
  onPress: () => void;
  settingUrl?: string;
}

const SettingContainer: FC<SettingContainerProps> = ({
  children,
  title,
  onPress,
  settingUrl,
}) => {
  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onPress}
          style={{ height: getSize(40), justifyContent: 'center' }}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText size={32} align="left" style={{ width: getSize(206) }}>
          {title}
        </MainText>
        {settingUrl ? (
          <TouchableOpacity onPress={() => Router.push(settingUrl)}>
            <Image
              source={require('@/assets/images/icons/setting.png')}
              style={{ width: getSize(40), height: getSize(40) }}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: getSize(40), height: getSize(40) }} />
        )}
      </View>
      {children}
    </SafeContainer>
  );
};

type Element = {
  title: string;
  onPress?: () => void;
  children?: ReactNode;
};

interface SettingElementProps {
  title: string;
  element: Element[];
  style?: object;
}

const SettingElement = ({
  title,
  element,
  style = {},
}: SettingElementProps) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TextWeight600
        size={20}
        spacing={0.2}
        style={{ marginLeft: getSize(7), marginBottom: getSize(17) }}
      >
        {title}
      </TextWeight600>
      <View style={styles.mainContainer}>
        {element.map((el, index) => {
          const isButton = !el.children && el.onPress;

          return (
            <>
              {index > 0 && <View style={styles.divideBar} />}
              {isButton ? (
                <TouchableOpacity key={index} style={styles.elementContainer}>
                  <TextWeight400 size={16} spacing={0.16}>
                    {el.title}
                  </TextWeight400>
                  <Image
                    source={require('@/assets/images/icons/Forward.png')}
                    style={{ width: getSize(20), height: getSize(20) }}
                  />
                </TouchableOpacity>
              ) : (
                <View key={index} style={styles.elementContainer}>
                  <TextWeight400 size={16} spacing={0.16}>
                    {el.title}
                  </TextWeight400>
                  {el.children}
                </View>
              )}
            </>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(135),
    paddingHorizontal: getSize(46),
    marginBottom: getSize(46),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  container: {
    width: getSize(360),
    marginHorizontal: 'auto',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: getSize(14),
    paddingVertical: getSize(5),
    backgroundColor: colors.settingBackground,
    borderRadius: getSize(15),
    justifyContent: 'center',
  },
  elementContainer: {
    width: getSize(332),
    height: getSize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divideBar: {
    width: getSize(332),
    height: getSize(1),
    backgroundColor: '#fff',
  },
});

type SettingElementType = {
  title: string;
  element: Element[];
};

type SettingListType = SettingElementType[];
export type { SettingListType };
export { SettingContainer, SettingElement };
