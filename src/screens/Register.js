import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import AppInput from '../components/AppInput';
import {Screen} from '../components/Screen';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import {useState} from 'react';
import {authantication, db} from '../firebase/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, 'ee');
  console.log(password, 'Pass');
  return (
    <Screen scrollView={false} style={{backgroundColor: 'rgb(1	,27	,146	)'}}>
      <View style={styles.boxOne} />
      <View style={styles.boxtwo} />

      <AppText style={styles.title}>Create account</AppText>
      <AppText style={{color: 'white'}}>Sign up and start shopoing</AppText>
      <View style={styles.fotter}>
        <View>
          <AppText style={styles.text}>Name</AppText>
          <AppInput
            placeholder={'Name'}
            value={name}
            onChangeText={val => setName(val)}
          />
        </View>
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
        <TextInput secureTextEntry="" />
        <AppButton
          title={'create account'}
          style={styles.btn}
          onPress={() => {
            createUserWithEmailAndPassword(authantication, email, password)
              .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                  email,
                  name,
                }).then(() => console.log('Document updated'));

                // ...
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error);
              });
            console.log('p');
          }}
        />
        <View style={styles.row}>
          <AppText style={styles.signupText}>Already have account</AppText>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <AppText style={[styles.signupText, {color: 'rgb(39	,73	,220	)'}]}>
              sign in
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default Register;

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
  text: {color: 'black', fontSize: 14, marginBottom: 10, marginTop: 25},
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
