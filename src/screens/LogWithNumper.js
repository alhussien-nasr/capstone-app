import {
  StyleSheet,
  View,
  Dimensions,
  ToastAndroid,
  StatusBar,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import AppInput from '../components/AppInput';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import {useState} from 'react';
import {authantication} from '../firebase/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const LogWithNumper = ({navigation}) => {
  const dispatch = useDispatch();
  // const st = () => {
  //   ToastAndroid.showWithGravity(
  //     'A wild toast appeared!',
  //     ToastAndroid.LONG,
  //     ToastAndroid.TOP,
  //     25,
  //     50,
  //   );
  // };

  const [phone, setPhone] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [code, setCode] = useState(null);
  console.log(code);
  console.log(confirmCode, 'concode');
  const showToast = txt => {
    Toast.show({
      type: 'success',
      text1: txt,
    });
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const sighInWithPhone = async () => {
    await axios
      .post('http://www.rncourseproject.com/app/verify', {
        phone,
      })
      .then(res => {
        setConfirmCode(res.data.code);
        showToast(res.data.code.toString());
      })
      .catch(err => console.log(err, 'err'));
  };
  const confirm = async () => {
    if (confirmCode == code) {
      await axios
        .post('http://www.rncourseproject.com/app/verify/validate', {
          phone: phone,
          code: code,
        })
        .then(res => {
          dispatch(setConfirm(res.data));
          console.log(res, 'user data');
        })
        .catch(err => console.log(err, 'err'));
    } else {
      console.log('error');
    }
  };

  return (
    <Screen scrollView={false} style={{backgroundColor: 'rgb(1	,27	,146	)'}}>
      <View style={styles.boxOne} />
      <View style={styles.boxtwo} />

      <AppText style={styles.title}>Welcome back!</AppText>
      <AppText style={{color: 'white', paddingHorizontal: 20}}>
        log back into your account!
      </AppText>
      <View style={styles.fotter}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <AppText style={styles.text}>phone number</AppText>
          <AppInput
            placeholder={'phone number'}
            value={phone}
            onChangeText={val => setPhone(val)}
          />
        </View>
        {confirmCode && (
          <>
            <View>
              <AppText style={styles.text}>{'code'}</AppText>
              <AppInput
                placeholder={'code'}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={code}
                onChangeText={val => setCode(val)}
              />
            </View>
            <AppButton
              style={{width: 200, marginTop: 50}}
              title="Send Again"
              onPress={() => sighInWithPhone()}
            />
          </>
        )}
        <AppButton
          title={'log in'}
          style={styles.btn}
          onPress={() => (confirmCode ? confirm() : sighInWithPhone())}
        />

        {/* <View style={styles.row}>
          <AppText style={styles.signupText}>don't have an account</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <AppText style={[styles.signupText, {color: 'rgb(39	,73	,220	)'}]}>
              sign up
            </AppText>
          </TouchableOpacity>
        </View> */}
      </View>
    </Screen>
  );
};

export default LogWithNumper;

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
    color: 'white',
    paddingHorizontal: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingHorizontal: 20,
  },
  btn: {marginTop: 50, bottom: 150, position: 'absolute'},
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
  adress: {width: '40%'},
});
