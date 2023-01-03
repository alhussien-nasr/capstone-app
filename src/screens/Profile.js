import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../components/AppText';
import {Screen} from '../components/Screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const [img, setImg] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [massage, setMassage] = useState(null);
  const [data, setData] = useState(null);
  const storage = getStorage(app);

  const user = useSelector(state => state.equipment.userInfo.userData._id);
  console.log(user);
  const dispatch = useDispatch();

  const uploadImg = async () => {
    const image = await launchImageLibrary({
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1500,
    });
    setImg(image.assets[0].uri);
    const img = await fetch(image.assets[0].uri);
    const bytes = await img.blob();
    uploadBytes(ref(storage, user), bytes).catch(err => console.log(err));
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        uploadImg();
      } else {
        console.log('Camera permission denied');
        setShowAlert(true);
        setMassage('The permission is limited: some actions are possible');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getImg = () => {
    getDownloadURL(ref(storage, user))
      .then(val => {
        setImg(val);
      })
      .catch(error => {
        console.log(error);
      });
  };
  var config = {
    method: 'get',
    url: 'http://www.rncourseproject.com/app/address',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzZXMiOltdLCJ3YWxsZXQiOjAsInBvaW50cyI6MCwiX2lkIjoiNWViNzM1YzJhMWUxMTY0ZWIzZjc5YTE5IiwicGhvbmUiOjEwMjM0NTY3ODksImNyZWF0ZWRfYXQiOiIyMDIwLTA1LTA5VDIyOjU5OjE0LjczMFoiLCJyb2xlIjpbXSwiX192IjowLCJpYXQiOjE1ODkyMzY5NjR9.Fi-wVu1MYa5xL0eVqHx3wzrxnr5xKcmOSOg9JZs3d8U',
    },
  };
  useEffect(() => {
    getImg();
    axios(config).then(res => console.log(res, 'from profile'));
  }, []);

  const OpenIosLibrary = () => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setMassage(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            setMassage(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            setShowAlert(true);
            setMassage('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            uploadImg();

            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Screen style={styles.container} scrollView={false}>
      <AppText style={styles.title}>Profile</AppText>
      <TouchableOpacity
        onPress={() =>
          Platform.OS == 'ios' ? OpenIosLibrary() : requestCameraPermission()
        }
        style={styles.imgContainer}>
        {img ? (
          <Image
            source={{uri: img}}
            style={{width: 120, height: 120, borderRadius: 70}}
          />
        ) : (
          <Icon name="person" size={40} />
        )}
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message={massage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="go to setting"
        confirmButtonColor="rgb(44	,70	,219	)"
        onConfirmPressed={() => Linking.openSettings()}
      />
      <AppText style={styles.subtitle}>{data?.name}</AppText>
      <AppText style={styles.subtitle}>{user?.phone}</AppText>
      <TouchableOpacity
        style={styles.setting}
        onPress={() => {
          navigation.navigate('AccountInformation');
        }}>
        <View style={styles.icon}>
          <SIcon name="settings" size={20} color="white" />
        </View>
        <AppText>account info</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.setting}
        onPress={() => {
          dispatch(logout());
        }}>
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
