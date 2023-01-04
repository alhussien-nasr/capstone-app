import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {apiCall} from '../api';
import {Screen} from '../components/Screen';
import Lottie from 'lottie-react-native';
import {setAddress, setCart} from '../Redux/EqSlice';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const CheckOut = ({route}) => {

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  return (
    <Screen scrollView={false} style={styles.container}>
      <AppText style={styles.title}>CheckOut</AppText>
      {address.length == 0 && (
        <>
          <AppText>there is no address</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Address')}>
            <AppText style={{color: 'rgb(39	,73	,220	)'}}>Add addres</AppText>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.addressContainer}>
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                addres == item._id ? styles.selectedAddress : styles.address
              }
              onPress={() => {
                setAddres(item._id);
              }}>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                Name: {item.name}
              </AppText>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                building: {item.phone}
              </AppText>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                city: {item.city}
              </AppText>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                area: {item.area}
              </AppText>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                street: {item.street}
              </AppText>
              <AppText
                style={addres == item._id ? styles.SelectedText : styles.Text}>
                building: {item.building}
              </AppText>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && <ActivityIndicator size="large" />}
      <AppButton
        style={[styles.btn, !addres && {backgroundColor: 'gray'}]}
        title={'confirm'}
        disabled={!addres && true}
        onPress={() => confirm()}
      />
      {success && (
        <Lottie
          source={require('../assets/image/success.json')}
          autoPlay={success}
          loop={false}
          onAnimationFinish={() => navigation.navigate('Home')}
          autoSize
          style={styles.icon}
        />
      )}
    </Screen>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
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
  selectedAddress: {
    width: width * 0.7,
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'rgb(39	,73	,220	)',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'rgb(39	,73	,220	)',
    shadowRadius: 1,
    elevation: 1,
  },

  container: {alignItems: 'center'},
  addressContainer: {
    height: '70%',
    width: width,
    borderColor: 'gray',
    padding: 10,
  },
  btn: {position: 'absolute', bottom: 40},
  SelectedText: {color: 'white'},
  icon: {
    position: 'absolute',
    top: 100,
    width: 300,
    height: 300,
  },
  title: {marginBottom: 20, fontSize: 20, fontWeight: '600'},
});
