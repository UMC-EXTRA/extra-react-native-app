import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
  Text,
  ImageSourcePropType,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Svg, Path } from 'react-native-svg';

import { MainContainer } from '@/components/Container';
import { MainText } from '@/components/Theme/Text';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

interface ChatHeaderProps {
  title: string;
  headcount: number;
  backLink: string;
  setOpenMenu: (show: boolean) => void;
}

const ChatHeader = ({
  title,
  headcount,
  backLink,
  setOpenMenu,
}: ChatHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{ ...styles.headerItemContainer, width: '60%' }}>
        <TouchableOpacity onPress={() => Router.navigate(backLink)}>
          <FontAwesome name="angle-left" size={getSize(40)} color="white" />
        </TouchableOpacity>
        <MainText size={22}>{title}</MainText>
        <MainText
          size={22}
          style={{
            color: '#929292',
          }}
        >
          {headcount}
        </MainText>
      </View>
      <View style={{ ...styles.headerItemContainer, width: '20%' }}>
        <TouchableOpacity>
          <Image
            source={require('@/assets/images/icons/Search.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenMenu(true);
          }}
        >
          <Image
            source={require('@/assets/images/icons/Menu.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ChatMenuProps {
  setDisplay: (display: boolean) => void;
  title: string;
  headcount: number;
  createDate: string;
}

const ChatMenu = ({
  setDisplay,
  title,
  headcount,
  createDate,
}: ChatMenuProps) => {
  const animation = useRef(new Animated.Value(getSize(-300))).current;

  const menuAnimation = (close: boolean) => {
    Animated.timing(animation, {
      toValue: close ? getSize(-300) : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    if (close) {
      setTimeout(() => {
        setDisplay(false);
      }, 500);
    }
  };

  useEffect(() => {
    menuAnimation(false);
  }, []);

  return (
    <View style={styles.menuBackground}>
      <Pressable
        style={{ ...styles.menuBackground, backgroundColor: 'transparent' }}
        onPress={() => menuAnimation(true)}
      />
      <Animated.View
        style={{
          ...styles.menuContainer,
          right: animation,
        }}
      >
        <View style={styles.menuHeader}>
          <MainText align="left">{title}</MainText>
          <MainText
            align="left"
            size={18}
            style={{
              color: '#929292',
              marginBottom: getSize(5),
            }}
          >
            {headcount}명 참여중
          </MainText>
          <MainText
            align="left"
            size={18}
            style={{
              color: '#929292',
            }}
          >
            개설일 {createDate}
          </MainText>
        </View>
        <View style={styles.divideBar} />
      </Animated.View>
    </View>
  );
};

interface ChatFooterProps {
  value: string;
  setValue: (value: string) => void;
  submitHandler: () => void;
}

const ChatFooter = ({ value, setValue, submitHandler }: ChatFooterProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.footerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={getSize(76)}
    >
      <View style={styles.footerItemContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <Image
            source={require('@/assets/images/icons/Plus.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={styles.textInput}
            placeholder="내용을 입력해 주세요."
            placeholderTextColor="#656565"
            onSubmitEditing={submitHandler}
            multiline={true}
          />
          <TouchableOpacity
            disabled={value.length === 0}
            onPress={submitHandler}
          >
            {value.length > 0 ? (
              <Image
                source={require('@/assets/images/icons/Email-Send-color.png')}
                style={styles.sendIcon}
              />
            ) : (
              <Image
                source={require('@/assets/images/icons/Email-Send.png')}
                style={styles.sendIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

interface ChatContentProps {
  isMyChat: boolean;
  name: string;
  profile: ImageSourcePropType;
  content: string;
  time: string;
  readingCount: number;
  equalBefore: boolean;
}

const ChatContent = ({
  isMyChat,
  name,
  profile,
  content,
  time,
  readingCount,
  equalBefore,
}: ChatContentProps) => {
  return (
    <View
      style={{
        ...styles.contentContainer,
        alignItems: isMyChat ? 'flex-end' : 'flex-start',
        ...(!equalBefore && { paddingTop: getSize(15) }),
      }}
    >
      {!isMyChat && !equalBefore && (
        <>
          <Image source={profile} style={styles.userProfile} />
          <Text style={styles.userName}>{name}</Text>
        </>
      )}
      <View
        style={{
          ...styles.mainContentContainer,
          ...(isMyChat
            ? { backgroundColor: '#888' }
            : {
                backgroundColor: '#424242',
                marginLeft: getSize(55),
              }),
        }}
      >
        <Text style={styles.mainContentText}>{content}</Text>
        <Text
          style={{
            ...styles.readingCount,
            ...(isMyChat ? { left: getSize(-30) } : { right: getSize(-30) }),
          }}
        >
          {readingCount}
        </Text>
        {!equalBefore &&
          (isMyChat ? (
            <Svg
              width="60"
              height="50"
              style={{
                ...styles.angleRight,
                transform: [{ rotateY: '180deg' }],
              }}
            >
              <Path
                d="M55.911 25.1715L31 50L0 16.0687L55.911 25.1715Z"
                fill="#888"
              />
            </Svg>
          ) : (
            <Svg width="60" height="50" style={styles.angleLeft}>
              <Path
                d="M55.911 25.1715L31 50L0 16.0687L55.911 25.1715Z"
                fill="#424242"
              />
            </Svg>
          ))}
      </View>
    </View>
  );
};

interface ChatNoticeProps {
  title: string;
  content: string;
}

const ChatNotice = ({ title, content }: ChatNoticeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.noticeBackground}>
      <View style={styles.noticeContainer}>
        <View style={styles.noticeHeader}>
          <Image
            source={require('@/assets/images/icons/Commercial.png')}
            style={{ width: getSize(20), height: getSize(20) }}
          />
          <MainText
            style={{ fontSize: getSize(15), width: '70%', textAlign: 'start' }}
          >
            {title}
          </MainText>
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <FontAwesome
              name={`angle-${open ? 'up' : 'down'}`}
              size={getSize(40)}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {open && (
          <View style={styles.noticeContentContainer}>
            <Text style={styles.noticeContent}>{content}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

type Chat = {
  id: number;
  user_id: number;
  name: string;
  profile: ImageSourcePropType;
  content: string;
  time: string;
  readingCount: number;
};

interface ChatContainerProps {
  title: string;
  headcount: number;
  backLink: string;
  createDate: string;
  chatingList: Chat[];
  user_id: number;
  notice: {
    title: string;
    content: string;
  };
}

const ChatContainer = ({
  title,
  headcount,
  backLink,
  createDate,
  chatingList,
  user_id,
  notice,
}: ChatContainerProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<Chat[]>([]);

  useEffect(() => {
    setData(chatingList);
  }, [chatingList]);

  const submitHandler = () => {
    setData([
      ...data,
      {
        id: data.length + 1,
        user_id: user_id,
        name: '이건',
        profile: require('@/assets/images/sample.jpeg'),
        content: value,
        time: '2021.08.20 12:35',
        readingCount: 60,
      },
    ]);
  };

  return (
    <MainContainer>
      <ChatHeader
        title={title}
        headcount={headcount}
        backLink={backLink}
        setOpenMenu={setOpenMenu}
      />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          <Pressable
            onPress={Keyboard.dismiss}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          />
          {data.map((chat, index) => (
            <ChatContent
              key={chat.id}
              isMyChat={chat.user_id === user_id}
              equalBefore={
                index > 0 && chat.user_id === data[index - 1].user_id
              }
              name={chat.name}
              profile={chat.profile}
              content={chat.content}
              time={chat.time}
              readingCount={chat.readingCount}
            />
          ))}
        </ScrollView>
        <ChatNotice title={notice.title} content={notice.content} />
      </View>
      <ChatFooter
        value={value}
        setValue={setValue}
        submitHandler={submitHandler}
      />
      {openMenu && (
        <ChatMenu
          setDisplay={setOpenMenu}
          title={title}
          headcount={headcount}
          createDate={createDate}
        />
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: getSize(155),
    paddingTop: getSize(60),
    paddingLeft: getSize(34),
    paddingRight: getSize(31),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.headerBackground,
  },
  headerItemContainer: {
    height: getSize(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    width: getSize(30),
    height: getSize(30),
  },
  menuBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    zIndex: 100,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: getSize(300),
    height: '100%',
    backgroundColor: '#202020',
    zIndex: 101,
  },
  menuHeader: {
    paddingTop: getSize(70),
    width: '100%',
    paddingLeft: getSize(30),
    paddingBottom: getSize(30),
    backgroundColor: colors.headerBackground,
  },
  divideBar: {
    width: '100%',
    height: getSize(1),
    backgroundColor: '#999',
  },
  footerContainer: {
    width: '100%',
    height: getSize(163),
    backgroundColor: '#292929',
  },
  footerItemContainer: {
    width: '100%',
    height: getSize(76),
    paddingVertical: getSize(16),
    backgroundColor: '#292929',
    alignItems: 'center',
    flexDirection: 'row',
  },
  plusButton: {
    marginLeft: getSize(20),
    marginRight: getSize(17),
  },
  plusIcon: {
    width: getSize(30),
    height: getSize(30),
  },
  textInputContainer: {
    width: getSize(349),
    height: getSize(47),
    backgroundColor: '#3f3f3f',
    borderRadius: getSize(30),
    paddingLeft: getSize(25),
    paddingRight: getSize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: getSize(18),
    fontWeight: '500',
    width: getSize(250),
    paddingTop: 0,
  },
  sendIcon: {
    width: getSize(25),
    height: getSize(25),
  },
  contentScrollView: {
    flexGrow: 1,
    paddingBottom: getSize(20),
    paddingTop: getSize(70),
  },
  contentContainer: {
    paddingHorizontal: getSize(25),
    paddingVertical: getSize(5),
  },
  mainContentContainer: {
    paddingVertical: getSize(15),
    paddingHorizontal: getSize(20),
    maxWidth: getSize(220),
    borderRadius: getSize(10),
  },
  mainContentText: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: getSize(15),
    lineHeight: getSize(20),
    flexWrap: 'wrap',
  },
  userProfile: {
    width: getSize(40),
    height: getSize(40),
    borderRadius: getSize(20),
    position: 'absolute',
    top: getSize(20),
    left: getSize(25),
  },
  userName: {
    fontSize: getSize(15),
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '900',
    lineHeight: getSize(20),
    marginLeft: getSize(55),
    marginTop: getSize(15),
    marginBottom: getSize(10),
    color: '#fff',
  },
  readingCount: {
    color: colors.highlight,
    fontSize: getSize(15),
    position: 'absolute',
    bottom: 0,
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '900',
    lineHeight: getSize(20),
  },
  angleLeft: {
    position: 'absolute',
    zIndex: -1,
    top: getSize(-10),
    left: getSize(-15),
  },
  angleRight: {
    position: 'absolute',
    zIndex: -1,
    top: getSize(-10),
    right: getSize(-15),
  },
  noticeBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    paddingHorizontal: getSize(17),
    paddingTop: getSize(12),
    zIndex: 100,
    top: 0,
    left: 0,
  },
  noticeContainer: {
    width: getSize(396),
    minHeight: getSize(49),
    backgroundColor: '#454545',
    borderRadius: getSize(10),
  },
  noticeHeader: {
    width: '100%',
    height: getSize(49),
    paddingHorizontal: getSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noticeContentContainer: {
    width: '100%',
    paddingVertical: getSize(20),
    paddingHorizontal: getSize(50),
  },
  noticeContent: {
    color: '#fff',
    fontSize: getSize(15),
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
});

export type { Chat };
export default ChatContainer;
