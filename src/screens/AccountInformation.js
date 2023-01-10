import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import AppText from '../components/AppText';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AccountInformation = ({navigation}) => {

  return (
    <Screen scrollView={false}>
      <AppText style={[styles.title, {paddingLeft: 20}]}>user address</AppText>

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
