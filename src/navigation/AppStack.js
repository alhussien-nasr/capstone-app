import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FIcon from 'react-native-vector-icons/Fontisto';
import AntIcon from 'react-native-vector-icons/AntDesign';

import ItemsScreen from '../screens/ItemsScreen';
import ItemDetails from '../screens/ItemDetails';
import {StackActions, useNavigation} from '@react-navigation/native';
import Bag from '../screens/Bag';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import {useSelector} from 'react-redux';
import LogWithNumper from '../screens/LogWithNumper';
import CheckOut from '../screens/CheckOut';
import AccountInformation from '../screens/AccountInformation';
import Address from '../screens/Address';
import {TabStack} from './TabStack';
import {Header} from './Header';
const Stack = createNativeStackNavigator();
const popAction = StackActions.pop(1);

export const AppStack = () => {
  const {categories} = useSelector(state => state.categories);
  const {cartItems} = useSelector(state => state.cart);

  const navigation = useNavigation();
  // const Token = useSelector(state => state.equipment.userInfo?.token);
  const headerRight = () => (
    <View style={{marginTop: 15}}>
      {cartItems.length != 0 && (
        <View style={styles.headerRight}>
          <AppText style={{color: 'white'}}>{cartItems.length}</AppText>
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

  return false ? (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen
        component={LogWithNumper}
        name="LogWithNumper"
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
