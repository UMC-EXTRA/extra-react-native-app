import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MainText } from '@/components/Theme/Text';
import { SafeContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

import { Router } from '@/scripts/router';
import {
  setAttendanceInfoList,
  setPage,
  setRoleApplicantData,
} from '@/redux/manage/companyManageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  getApplicantsByRoleId,
  getAttendanceInfoListByJobPostId,
} from '@/api/manageController';

const ApplicantsScreen = () => {
  const manage = useAppSelector(state => state.companyManage);
  const dispatch = useAppDispatch();

  const sortItems = ['역할별', '성별', '나이별'];

  const [clicked, setClicked] = useState(false);
  const [sorted, setSorted] = useState(sortItems[0]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (manage.attandanceInfoList.length === 0) {
      loadData();
    }
  }, [manage.roleApplicantList]);

  const loadData = async () => {
    getAttendanceInfoListByJobPostId(manage.jobPostId).then(res => {
      if (res !== null) {
        dispatch(setAttendanceInfoList(res));
      }
    });
    // const nextPage = manage.page + 1;
    // dispatch(setPage(nextPage));
    // await manage.roleIdList.forEach(async (id, index) => {
    //   await getApplicantsByRoleId(id, nextPage).then(res => {
    //     if (res !== null) {
    //       dispatch(setRoleApplicantData({ index, data: res }));
    //     }
    //   });
    // });
  };

  return (
    <SafeContainer>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backLinkButton}
          onPress={() => Router.navigate('/company/manage/detail')}
        >
          <AntDesign name="caretleft" size={getSize(28)} color="white" />
        </TouchableOpacity>
        <MainText size={30} spacing={0.3}>
          출연자 목록
        </MainText>
      </View>
      <View style={styles.listHeader}>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => setClicked(!clicked)}
        >
          {clicked ? (
            <Octicons name="triangle-up" size={getSize(20)} color="white" />
          ) : (
            <Octicons name="triangle-down" size={getSize(20)} color="white" />
          )}
          <MainText style={{ fontSize: getSize(18) }}>{sorted}</MainText>
          {clicked && (
            <View style={styles.filterDropdown}>
              {sortItems.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSorted(item);
                    setClicked(false);
                  }}
                  key={index}
                  style={styles.filterItemContainer}
                >
                  <MainText style={{ fontSize: getSize(18) }}>{item}</MainText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
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
      <ScrollView contentContainerStyle={styles.listContainer}>
        {manage.attandanceInfoList.map((data, index) => (
          <TouchableOpacity
            key={data.id}
            style={styles.listItemContainer}
            onPress={() =>
              Router.navigate({
                pathname: '/company/manage/applicant-detail',
                params: {
                  memberId: data.memberId,
                  memberName: data.memberName,
                  history: '/company/manage/applicants',
                },
              })
            }
          >
            <View style={styles.itemImage}></View>
            <MainText
              style={{
                height: '100%',
                marginTop: getSize(25),
                paddingLeft: getSize(17),
                width: getSize(219),
                textAlign: 'left',
              }}
            >
              {data.memberName}/{data.roleName}
            </MainText>
            <View
              style={{
                ...styles.statusDot,
                backgroundColor: data.isAttended ? '#35EB17' : '#E00338',
              }}
            />
            <Image
              source={require('@/assets/images/icons/Forward.png')}
              style={styles.navigateIconImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(136),
    paddingHorizontal: getSize(35),
    flexDirection: 'row',
    paddingTop: getSize(63),
  },
  backLinkButton: {
    marginLeft: getSize(11),
    marginRight: getSize(22.45),
  },
  listHeader: {
    marginHorizontal: getSize(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getSize(45),
    marginBottom: getSize(37),
    zIndex: 100,
    elevation: 100,
  },
  filter: {
    width: getSize(84),
    height: '100%',
    backgroundColor: colors.grayBackground,
    paddingHorizontal: getSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: getSize(5),
  },
  filterDropdown: {
    position: 'absolute',
    top: getSize(45),
    left: 0,
    width: getSize(84),
  },
  filterItemContainer: {
    backgroundColor: colors.grayBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize(5),
    height: getSize(45),
    paddingHorizontal: getSize(10),
  },
  textInputContainer: {
    width: getSize(192),
    height: '100%',
    backgroundColor: colors.grayBackground,
    borderRadius: getSize(5),
    paddingHorizontal: getSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: getSize(152),
    fontFamily: 'Inter-Regular',
    fontSize: getSize(18),
    color: '#fff',
  },
  searchIconImage: {
    width: getSize(20),
    height: getSize(20),
  },
  listContainer: {
    flexGrow: 1,
    width: getSize(365),
    marginHorizontal: 'auto',
  },
  listItemContainer: {
    width: getSize(365),
    height: getSize(87),
    borderRadius: getSize(20),
    backgroundColor: colors.grayBackground,
    marginBottom: getSize(23),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getSize(17),
    paddingRight: getSize(9),
    justifyContent: 'space-between',
  },
  itemImage: {
    width: getSize(52),
    height: getSize(52),
    backgroundColor: '#D9D9D9',
    borderRadius: getSize(26),
  },
  statusDot: {
    width: getSize(13),
    height: getSize(13),
    borderRadius: getSize(6.5),
  },
  navigateIconImage: {
    width: getSize(40),
    height: getSize(40),
  },
});

export default ApplicantsScreen;
