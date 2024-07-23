import {
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';

import { FormButton } from '@/components/FormComponents';
import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

import { TermState } from '@/redux/stateTypes';
import { setTermData } from '@/redux/signUpSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

const CheckBox = ({ checked, onPress }: CheckBoxProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.termCheck,
        backgroundColor: checked ? colors.highlight : 'transparent',
        borderColor: checked ? colors.highlight : '#999',
      }}
      onPress={onPress}
    >
      <Feather
        name="check"
        size={getSize(18)}
        color={checked ? '#000' : '#999'}
      />
    </TouchableOpacity>
  );
};

interface Props {
  setDisplay: (display: boolean) => void;
  complete: boolean;
  setComplete: (complete: boolean) => void;
}

// Modal for agreement of terms
const TermModal = ({ setDisplay, complete, setComplete }: Props) => {
  const terms: TermState = useAppSelector(state => state.signUp.terms);
  const dispatch = useAppDispatch();

  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(
    Array(terms.length).fill(false),
  );

  const animation = useRef(new Animated.Value(getSize(-477))).current;

  useEffect(() => {
    modalAnimation(false);
  }, []);

  useEffect(() => {
    if (checked.length > 0) {
      let all = true;
      let requireChecked = true;
      for (let i = 0; i < checked.length; i++) {
        if (checked[i] === false) {
          all = false;
        }
        if (
          terms[i] !== undefined &&
          !terms[i].optional &&
          checked[i] === false
        ) {
          requireChecked = false;
        }
      }
      setAllChecked(all);
      setComplete(requireChecked);
    }
  }, [checked]);

  const modalAnimation = (close: boolean) => {
    Animated.timing(animation, {
      toValue: close ? getSize(-477) : 0,
      duration: 500,
      delay: 0,
      useNativeDriver: false,
      isInteraction: true,
    }).start();
    if (close) {
      setTimeout(() => {
        setDisplay(false);
      }, 500);
    }
  };

  return (
    <View style={styles.modalBackground}>
      <Animated.View
        style={{
          ...styles.modalContainer,
          bottom: animation,
        }}
      >
        <View style={styles.termContainer}>
          <CheckBox
            checked={allChecked}
            onPress={() => {
              setChecked(Array(terms.length).fill(!allChecked));
              setAllChecked(!allChecked);
            }}
          />
          <Text
            style={{
              ...styles.termTitle,
              color: allChecked ? '#fff' : '#999',
            }}
          >
            약관 전체동의
          </Text>
        </View>
        <View style={styles.divdeBar} />
        {terms.map((term, index) => {
          if (term !== undefined)
            return (
              <View
                key={term.id}
                style={{
                  ...styles.termContainer,
                  ...(index !== 0 && { marginTop: getSize(24) }),
                }}
              >
                <CheckBox
                  checked={checked[index]}
                  onPress={() => {
                    let newChecked = [...checked];
                    newChecked[index] = !newChecked[index];
                    setChecked(newChecked);
                  }}
                />
                <Text
                  style={{
                    ...styles.termTitle,
                    color: checked[index] ? '#fff' : '#999',
                  }}
                >
                  {term.title} ({term.optional ? '선택' : '필수'})
                </Text>
              </View>
            );
        })}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => modalAnimation(true)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
          <FormButton
            style={{ width: getSize(258), height: '100%' }}
            active={complete}
            onPress={() => {
              dispatch(
                setTermData({
                  terms:
                    terms !== undefined
                      ? terms.map((term, index) => {
                          if (term !== undefined)
                            return {
                              id: term.id,
                              title: term.title,
                              content: term.content,
                              agree: checked[index],
                              optional: term.optional,
                            };
                        })
                      : [],
                }),
              );
              modalAnimation(true);
            }}
            text="다음"
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  modalContainer: {
    borderRadius: getSize(25),
    backgroundColor: '#2B2B2B',
    width: '100%',
    height: getSize(477),
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 101,
    paddingTop: getSize(44),
    paddingBottom: getSize(49),
  },
  divdeBar: {
    width: getSize(352),
    height: getSize(1),
    backgroundColor: '#999',
    marginVertical: getSize(20),
    marginHorizontal: 'auto',
    paddingHorizontal: getSize(39),
  },
  termContainer: {
    width: getSize(352),
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(25),
    paddingHorizontal: getSize(39),
  },
  termCheck: {
    marginLeft: getSize(9),
    width: getSize(25),
    height: getSize(25),
    borderRadius: getSize(5),
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: getSize(18),
    fontWeight: '500',
    marginLeft: getSize(25),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getSize(53),
    marginTop: getSize(40),
    paddingHorizontal: getSize(24),
  },
  cancelButton: {
    width: getSize(119),
    height: '100%',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: getSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getSize(5),
  },
  cancelButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: getSize(17),
    fontWeight: '700',
  },
});

export default TermModal;
