import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FIcon from 'react-native-vector-icons/Fontisto';
import AntIcon from 'react-native-vector-icons/AntDesign';

import ItemsScreen from '../screens/ItemsScreen';
import ItemDetails from '../screens/ItemDetails';
import {StackActions, useNavigation} from '@react-navigation/native';
import Bag from '../screens/Bag';
import {I18nManager, StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import {useDispatch, useSelector} from 'react-redux';
import LogWithNumper from '../screens/LogWithNumper';
import CheckOut from '../screens/CheckOut';
import AccountInformation from '../screens/AccountInformation';
import Address from '../screens/Address';
import {TabStack} from './TabStack';
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';
import {useEffect} from 'react';
import {createUser, onAuthChangeListner} from '../utils/firebase';
import {setCurrentUser} from '../store/user/userAction';
const Stack = createNativeStackNavigator();
const popAction = StackActions.pop(1);

I18nManager.allowRTL(false);

export const AppStack = () => {
  const cartCount = useSelector(state => state.cart.cartCount);

  const navigation = useNavigation();
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthChangeListner(user => {
      if (user) {
        createUser(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  const headerRight = () => (
    <View style={{marginTop: 15}}>
      {cartCount != 0 && (
        <View style={styles.headerRight}>
          <AppText style={{color: 'white'}}>{cartCount}</AppText>
        </View>
      )}
      <AntIcon
        onPress={() => navigation.navigate('Bag')}
        style={{}}
        name={'inbox'}
        size={30}
        color="black"
      />
    </View>
  );
  const headerLeft = () => (
    <FIcon
      name="angle-left"
      size={20}
      color="black"
      onPress={() => {
        navigation.dispatch(popAction);
      }}
    />
  );

  return !currentUser ? (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen
        component={LogIn}
        name="LogIn"
        options={{
          title: null,
          header: () => null,
        }}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{
          title: null,
          header: () => null,
        }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerRight,
        headerLeft,
        title: null,
        headerTransparent: true,
      }}>
      <Stack.Screen
        component={TabStack}
        name="TabStack"
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen component={ItemDetails} name="ItemDetails" />
      <Stack.Screen component={Bag} name="Bag" />
      <Stack.Screen component={CheckOut} name="CheckOut" />
      <Stack.Screen
        component={Address}
        name="Address"
        options={{
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        component={ItemsScreen}
        name="ItemsScreen"
        options={{
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        component={AccountInformation}
        name="AccountInformation"
        options={{
          headerRight: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'blue',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
    right: -5,
    zIndex: 1,
  },
});
