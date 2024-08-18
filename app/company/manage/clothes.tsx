import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MainText } from '@/components/Theme/Text';
import { SafeContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCostumeInfoListByRoleId } from '@/api/manageController';
import { setCostumeInfoData } from '@/redux/manage/companyManageSlice';

const ConfirmClothesScreen = () => {
  const manage = useAppSelector(state => state.companyManage);
  const dispatch = useAppDispatch();

  const [searchKey, setSearchKey] = useState<string[]>(
    Array.from({ length: manage.roleIdList.length }, () => ''),
  );
  const [page, setPage] = useState<number[]>(
    Array.from({ length: manage.roleIdList.length }, () => 0),
  );
  const [change, setChange] = useState<boolean[]>(
    Array.from({ length: manage.roleIdList.length }, () => false),
  );

  const loadData = async () => {
    manage.roleIdList.forEach(async (id, index) => {
      let reset = false;
      if (change[index]) {
        reset = true;
        setChange(change.map((value, i) => (i === index ? false : value)));
        setPage(page.map((value, i) => (i === index ? 0 : value)));
      } else {
        setPage(page.map((value, i) => (i === index ? value + 1 : value)));
      }
      if (searchKey[index] === '') {
        getCostumeInfoListByRoleId(id, page[index]).then(res => {
          if (res !== null) {
            dispatch(setCostumeInfoData({ index, data: res, reset }));
          }
        });
      } else {
        getCostumeInfoListByRoleId(id, page[index], searchKey[index]).then(
          res => {
            if (res !== null) {
              dispatch(setCostumeInfoData({ index, data: res, reset }));
            }
          },
        );
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [searchKey, page]);

  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backLinkButton}
          onPress={() => Router.navigate('/company/manage/detail')}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText size={30}>의상 컨펌</MainText>
      </View>
      <View
        style={{
          marginHorizontal: getSize(43),
          alignItems: 'flex-end',
          marginBottom: getSize(15),
        }}
      >
        <TouchableOpacity>
          <MainText size={14} spacing={0.14}>
            예시
          </MainText>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.listScrollView}>
        {manage.roleNameList.map((roleName, roleIndex) => {
          return (
            <View style={styles.listContainer} key={roleIndex}>
              <View style={styles.listHeader}>
                <MainText spacing={0.2}>
                  {roleIndex + 1}. {roleName}역할
                </MainText>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={searchKey[roleIndex]}
                    onChangeText={text => {
                      setSearchKey(
                        searchKey.map((value, i) =>
                          i === roleIndex ? text : value,
                        ),
                      );
                      setChange(
                        change.map((value, i) =>
                          i === roleIndex ? true : value,
                        ),
                      );
                    }}
                    style={styles.textInput}
                  />
                  <Image
                    source={require('@/assets/images/icons/Search.png')}
                    style={styles.searchIconImage}
                  />
                </View>
              </View>
              {manage.costumeInfoList[roleIndex].map((data, index) => (
                <TouchableOpacity
                  key={data.id}
                  style={styles.listItemContainer}
                  onPress={() =>
                    Router.navigate({
                      pathname: '/company/manage/clothes-detail',
                      params: {
                        id: data.id,
                        index: [roleIndex, index],
                        imageUrl: data.imageUrl,
                        status: data.costume_approve,
                        roleName,
                        season: manage.seasonList[index],
                      },
                    })
                  }
                >
                  <View style={styles.itemImage}></View>
                  <MainText
                    style={{
                      paddingLeft: getSize(17),
                      width: getSize(200),
                      textAlign: 'left',
                    }}
                  >
                    {data.member_name}/{roleName}
                  </MainText>
                  <View
                    style={{
                      ...styles.statusText,
                      backgroundColor:
                        data.costume_approve === 'APPLIED'
                          ? '#35EB17'
                          : '#767676',
                    }}
                  >
                    <MainText
                      style={{ fontSize: getSize(11), lineHeight: 'auto' }}
                    >
                      {data.costume_approve === 'APPLIED'
                        ? '컨펌 완료'
                        : '컨펌 전'}
                    </MainText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(98),
    paddingHorizontal: getSize(35),
    flexDirection: 'row',
    paddingTop: getSize(43),
  },
  backLinkButton: {
    marginLeft: getSize(11),
    marginRight: getSize(22.45),
  },
  listScrollView: {
    flexGrow: 1,
    marginHorizontal: getSize(32),
  },
  listContainer: {
    marginBottom: getSize(17),
  },
  listHeader: {
    paddingHorizontal: getSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: getSize(28),
    marginBottom: getSize(25),
  },
  textInputContainer: {
    width: getSize(165),
    height: '100%',
    backgroundColor: colors.grayBackground,
    borderRadius: getSize(5),
    paddingHorizontal: getSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: getSize(130),
    fontFamily: 'Inter-Regular',
    fontSize: getSize(18),
    color: '#fff',
  },
  searchIconImage: {
    width: getSize(15),
    height: getSize(15),
  },
  listItemContainer: {
    width: getSize(365),
    height: getSize(63),
    borderRadius: getSize(20),
    backgroundColor: colors.grayBackground,
    marginBottom: getSize(23),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(17),
    justifyContent: 'space-between',
  },
  itemImage: {
    width: getSize(40),
    height: getSize(40),
    backgroundColor: '#D9D9D9',
    borderRadius: getSize(20),
  },
  statusText: {
    width: getSize(62),
    height: getSize(20),
    borderRadius: getSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigateIconImage: {
    width: getSize(40),
    height: getSize(40),
  },
});

export default ConfirmClothesScreen;
