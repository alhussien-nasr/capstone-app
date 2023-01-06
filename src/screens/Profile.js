import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React from 'react';
import {app, signOutUser} from '../utils/firebase';
import AppText from '../components/AppText';
import {Screen} from '../components/Screen';
import Icon from 'react-native-vector-icons/Ionicons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const currentUser = useSelector(state => state.user.currentUser);
  console.log(currentUser);

  return (
    <Screen style={styles.container} scrollView={false}>
      <AppText style={styles.title}>Profile</AppText>
      <TouchableOpacity style={styles.imgContainer}>
        <Icon name="person" size={40} />
      </TouchableOpacity>

      <AppText style={styles.subtitle}>{currentUser?.email}</AppText>

      <TouchableOpacity style={styles.setting} onPress={signOutUser}>
        <View style={styles.icon}>
          <SIcon name="logout" size={20} color="white" />
        </View>
        <AppText>Sign out</AppText>
      </TouchableOpacity>
    </Screen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {padding: 10},
  title: {fontSize: 33, fontWeight: '700', marginBottom: 20},
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    alignSelf: 'center',
  },

  imgContainer: {
    width: 140,
    height: 140,
    padding: 5,
    borderRadius: 70,
    borderWidth: 7,
    borderColor: 'rgb(44	,70	,219	)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: 'rgb(34	,35	,82	)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
});
