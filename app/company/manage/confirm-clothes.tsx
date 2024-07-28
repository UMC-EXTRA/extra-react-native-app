import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MainText } from '@/components/TextComponents';
import { SafeContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

import type { Members } from '@/redux/manage/stateTypes';
import { isCompanyManageState } from '@/redux/manage/stateTypes';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { initMemberList } from '@/redux/manage/manageSlice';

type SortedByRoleMembers = {
  [key: string]: Members;
};

const ConfirmClothesScreen = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [members, setMembers] = useState<SortedByRoleMembers>({});

  useEffect(() => {
    if (isCompanyManageState(manage)) {
      let newMembers: SortedByRoleMembers = {};
      const SortedByRoleMembers = [...manage.members].sort((a, b) => {
        return a.role.localeCompare(b.role);
      });
      SortedByRoleMembers.forEach(data => {
        if (newMembers[data.role] === undefined) {
          newMembers[data.role] = [];
        }
        newMembers[data.role].push(data);
      });
      setMembers(newMembers);
    }
  }, [manage]);

  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backLinkButton}
          onPress={() => router.navigate('/company/manage/detail')}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText style={{ fontSize: getSize(30) }}>의상 컨펌</MainText>
      </View>
      <View
        style={{
          marginHorizontal: getSize(43),
          alignItems: 'flex-end',
          marginBottom: getSize(15),
        }}
      >
        <TouchableOpacity>
          <MainText style={{ fontSize: getSize(18) }}>예시</MainText>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.listScrollView}>
        {Object.keys(members).map((role, index) => {
          return (
            <View style={styles.listContainer} key={index}>
              <View style={styles.listHeader}>
                <MainText>
                  {index + 1}. {role}역할
                </MainText>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    style={styles.textInput}
                  />
                  <Image
                    source={require('@/assets/images/icons/Search.png')}
                    style={styles.searchIconImage}
                  />
                </View>
              </View>
              {members[role].map(data => (
                <TouchableOpacity
                  key={data.id}
                  style={styles.listItemContainer}
                  onPress={() =>
                    router.navigate({
                      pathname: '/company/manage/camera',
                      params: { memberId: data.id },
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
                    {data.name}/{data.role}
                  </MainText>
                  <View
                    style={{
                      ...styles.statusText,
                      backgroundColor: data.isConfirmed ? '#35EB17' : '#767676',
                    }}
                  >
                    <MainText
                      style={{ fontSize: getSize(11), lineHeight: 'auto' }}
                    >
                      {data.isConfirmed ? '컨펌 완료' : '컨펌 전'}
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
