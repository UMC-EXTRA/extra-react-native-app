import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import BackHeader from '@/components/BackHeader';

const FormScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [valid, setValid] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '남자', value: 'male' },
    { label: '여자', value: 'female' },
  ]);

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  ref_input[3] = useRef(null);
  ref_input[4] = useRef(null);
  ref_input[6] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };

  useEffect(() => {
    if (
      email.length > 0 &&
      phone.length > 0 &&
      name.length > 0 &&
      birth.length &&
      gender.length > 0 &&
      address.length > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, phone, name, birth, gender, address]);

  return (
    <View style={{ flex: 1 }}>
      <BackHeader />
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.mainText}>필수 정보를 입력해주세요.</Text>
          <Text style={{ ...styles.subText, marginTop: getSize(18) }}>
            일자리 신청에 꼭 필요한
          </Text>
          <Text
            style={{
              ...styles.subText,
              marginTop: getSize(5),
              marginBottom: getSize(39),
            }}
          >
            정보를 입력해주세요.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력해주세요."
            placeholderTextColor="#696969"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            ref={ref_input[0]}
            onSubmitEditing={() => onFocusNext(0)}
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호를 입력해주세요."
            placeholderTextColor="#696969"
            inputMode="tel"
            value={phone}
            onChangeText={setPhone}
            returnKeyType="next"
            ref={ref_input[1]}
            onSubmitEditing={() => onFocusNext(1)}
          />
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#696969"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            ref={ref_input[2]}
            onSubmitEditing={() => onFocusNext(2)}
          />
          <TextInput
            style={styles.input}
            placeholder="생일을 입력해주세요. 예)19901010"
            placeholderTextColor="#696969"
            keyboardType="number-pad"
            value={birth}
            onChangeText={setBirth}
            returnKeyType="next"
            ref={ref_input[3]}
            onSubmitEditing={() => onFocusNext(3)}
          />
          <DropDownPicker
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            style={styles.input}
            placeholder="성별을 선택해주세요."
            placeholderStyle={{
              color: '#696969',
              fontSize: getSize(14),
              fontFamily: 'Inter-SemiBold',
              fontWeight: '500',
            }}
            textStyle={{
              color: '#fff',
              fontSize: getSize(14),
              fontFamily: 'Inter-Bold',
              fontWeight: '700',
            }}
            containerStyle={{
              width: getSize(368),
              height: getSize(59),
              marginBottom: getSize(19),
            }}
            listItemContainerStyle={{
              backgroundColor: '#000',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#696969',
            }}
          />
          <TextInput
            style={{ ...styles.input, marginBottom: 0 }}
            placeholder="거주지를 입력해주세요."
            placeholderTextColor="#696969"
            value={address}
            onChangeText={setAddress}
            returnKeyType="done"
            ref={ref_input[5]}
            onSubmitEditing={() => onFocusNext(5)}
          />
          <TouchableOpacity
            style={{
              ...styles.confirmButton,
              backgroundColor: valid ? colors.highlight : '#575757',
            }}
            disabled={valid}
            onPress={() => router.push('/member/')}
          >
            <Text
              style={{
                ...styles.confirmButtonText,
                color: valid ? '#000' : '#adadad',
              }}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  mainText: {
    marginTop: getSize(29),
    color: '#fff',
    fontSize: getSize(20),
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '900',
    lineHeight: getSize(41),
    width: getSize(368),
  },
  subText: {
    width: getSize(368),
    color: '#fff',
    fontSize: getSize(14),
    fontWeight: '200',
    fontFamily: 'Inter-Light',
    lineHeight: getSize(15),
  },
  input: {
    backgroundColor: '#000',
    width: getSize(368),
    height: getSize(59),
    borderRadius: getSize(15),
    borderStyle: 'solid',
    borderWidth: getSize(2),
    borderColor: '#696969',
    paddingLeft: getSize(26),
    color: '#fff',
    fontSize: getSize(14),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    marginBottom: 19,
    marginHorizontal: 'auto',
  },
  confirmButton: {
    width: getSize(383),
    height: getSize(53),
    borderRadius: getSize(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getSize(63),
  },
  confirmButtonText: {
    fontSize: getSize(17),
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: getSize(22),
  },
});

export default FormScreen;
