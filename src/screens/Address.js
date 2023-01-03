import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import {apiCall} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {setAddress} from '../Redux/EqSlice';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Address = ({}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [street, setStreent] = useState('');
  const [building, setBuilding] = useState('');
  const token = useSelector(state => state.equipment.userInfo.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addAddriss = () => {
    apiCall(
      'address',
      'post',
      {
        name,
        phone,
        city,
        area,
        street,
        building,
      },
      token,
    )
      .then(res => {
        apiCall('address', 'get', undefined, token).then(res => {
          dispatch(setAddress(res.data.adds));
        });
        console.log(res, 'upload adress');
      })
      .catch(err => console.log(err, 'upllad adress'));
  };
  return (
    <Screen scrollView={false}>
      <AppText style={styles.title}>Add Address</AppText>
      <View style={styles.fotter}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <AppText style={styles.text}>name</AppText>
          <AppInput
            placeholder={'name'}
            value={name}
            onChangeText={val => setName(val)}
          />
          <AppText style={styles.text}>phone number</AppText>
          <AppInput
            placeholder={'phone number'}
            value={phone}
            onChangeText={val => setPhone(val)}
          />
        </View>
        <AppText style={styles.text}>{'adress'}</AppText>
        <View style={styles.row}>
          <AppInput
            style={styles.adress}
            placeholder={'city'}
            value={city}
            onChangeText={val => setCity(val)}
          />
          <AppInput
            style={styles.adress}
            placeholder={'area'}
            value={area}
            onChangeText={val => setArea(val)}
          />
        </View>

        <View style={styles.row}>
          <AppInput
            style={styles.adress}
            placeholder={'street'}
            value={street}
            onChangeText={val => setStreent(val)}
          />
          <AppInput
            style={styles.adress}
            placeholder={'bulding'}
            value={building}
            onChangeText={val => setBuilding(val)}
          />
        </View>
        <AppButton
          title={'add'}
          style={styles.btn}
          onPress={() => {
            addAddriss();
            navigation.goBack();
          }}
        />
      </View>
    </Screen>
  );
};

export default Address;

const styles = StyleSheet.create({
  fotter: {
    width: width,
    height: height * 0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    flex: 1,
    position: 'absolute',
    top: height - height * 0.8,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  btn: {marginTop: 20},
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    width: '100%',
  },

  adress: {width: '40%'},
});
