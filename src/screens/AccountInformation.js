import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import {apiCall} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {setAddress} from '../Redux/EqSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AccountInformation = ({navigation}) => {
  const token = useSelector(state => state.equipment.userInfo.token);
  const address = useSelector(state => state.equipment.address);
  console.log(address);
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall('address', 'get', undefined, token)
      .then(res => {
        console.log(res.data.adds, '12');
        dispatch(setAddress(res.data.adds));
      })
      .catch(err => console.log(err, '12'));
  }, []);
  return (
    <Screen scrollView={false}>
      <AppText style={[styles.title, {paddingLeft: 20}]}>user address</AppText>
      <FlatList
        data={address}
        contentContainerStyle={{height: '80%', alignItems: 'center'}}
        renderItem={({item}) => (
          <View style={styles.address}>
            <AppText>Name: {item.name}</AppText>
            <AppText>building: {item.phone}</AppText>
            <AppText>city: {item.city}</AppText>
            <AppText>area: {item.area}</AppText>
            <AppText>street: {item.street}</AppText>
            <AppText>building: {item.building}</AppText>
          </View>
        )}
      />
      <AppButton
        title={'add address'}
        style={styles.btn}
        onPress={() => navigation.navigate('Address')}
      />
    </Screen>
  );
};

export default AccountInformation;

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
  btn: {position: 'absolute', bottom: 70, alignSelf: 'center'},
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  signupText: {
    color: 'gray',
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: '600',
  },

  address: {
    width: width * 0.7,
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
  },
});
