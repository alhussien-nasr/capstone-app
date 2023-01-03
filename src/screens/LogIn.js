import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import AppInput from '../components/AppInput';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import {useState} from 'react';
import {
  logInWIthEmailAndPassword,
  signInWhithGooglePopup,
} from '../utils/firebase/index';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    res = await logInWIthEmailAndPassword(email, password);
    console.log(res, 'res');
  };
  return (
    <Screen scrollView={false} style={{backgroundColor: 'rgb(1	,27	,146	)'}}>
      <View style={styles.boxOne} />
      <View style={styles.boxtwo} />

      <AppText style={styles.title}>Welcome back!</AppText>
      <AppText style={{color: 'white'}}>log back into your account!</AppText>
      <View style={styles.fotter}>
        <View>
          <AppText style={styles.text}>Email</AppText>
          <AppInput
            placeholder={'Email'}
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={val => setEmail(val)}
          />
        </View>
        <View>
          <AppText style={styles.text}>Password</AppText>
          <AppInput
            placeholder={'Password'}
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            onChangeText={val => setPassword(() => val)}
          />
        </View>
        <AppButton title={'log in'} style={styles.btn} onPress={loginHandler} />
        <AppButton title={'Google'} onPress={signInWhithGooglePopup} />

        <TouchableOpacity onPress={() => navigation.navigate('LogWithNumper')}>
          <AppText style={{color: 'rgb(39	,73	,220	)', marginTop: 20}}>
            login with phone number
          </AppText>
        </TouchableOpacity>

        <View style={styles.row}>
          <AppText style={styles.signupText}>don't have an account</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <AppText style={[styles.signupText, {color: 'rgb(39	,73	,220	)'}]}>
              sign up
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default LogIn;

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
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 10,
    color: 'white',
  },
  text: {color: 'black', fontSize: 16, marginBottom: 10, marginTop: 30},
  btn: {marginTop: 50},
  row: {flexDirection: 'row', marginTop: 40},
  signupText: {
    color: 'gray',
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: '600',
  },
  boxOne: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 40,
    backgroundColor: 'rgb(75	,76	,109	)',
    zIndex: -1,
  },
  boxtwo: {
    position: 'absolute',
    width: 200,
    height: 100,
    top: 120,
    backgroundColor: 'rgb(77,	106,	178	)',
    zIndex: -1,
  },
});
