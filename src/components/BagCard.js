import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import {useDispatch, useSelector} from 'react-redux';
import {setCart} from '../Redux/EqSlice';
import {apiCall} from '../api';

const width = Dimensions.get('window').width;
const BagCard = ({item, style}) => {
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const user = useSelector(state => state.equipment.userInfo.token);
  const alterQuantity = async (id, action, count) => {
    try {
      await apiCall(
        'cart',
        'put',
        {id: id, action: action, count: count},
        user,
      );
      const res = await apiCall(`cart`, 'get', undefined, user);
      dispatch(setCart(res.data.items));
    } catch (error) {
      console.log(error, 'err');
    }
  };

  return (
    <SwipeProvider>
      <SwipeItem
        style={[styles.Swipecontainer]}
        rightButtons={
          <SwipeButtonsContainer
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              backgroundColor: 'tomato',
              borderRadius: 10,
              justifyContent: 'center',
              marginRight: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                alterQuantity(item._id, 'delete');
              }}>
              <Icon name="delete" size={30} />
            </TouchableOpacity>
          </SwipeButtonsContainer>
        }>
        <View style={[styles.container, style]}>
          <Image
            source={{
              uri:
                item?.product?.images &&
                `http://www.rncourseproject.com/uploads/products/${item.product.images[0]}`,
            }}
            style={styles.img}
            resizeMode="contain"
          />
          <View style={styles.details}>
            <AppText numberOfLines={2} style={styles.title}>
              {item.product?.title}
            </AppText>
            <AppText style={styles.price}>{item.product?.price}</AppText>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => {
                alterQuantity(item._id, 'increase', 1);
              }}>
              <AppText style={styles.countIcon}>+</AppText>
            </TouchableOpacity>
            <AppText>{item.count}</AppText>
            <TouchableOpacity
              onPress={() => alterQuantity(item._id, 'decrease', 1)}>
              <AppText style={styles.countIcon}> - </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeItem>
    </SwipeProvider>
  );
};
export default BagCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
  },
  img: {height: '100%', width: '30%', marginRight: 20},
  details: {justifyContent: 'space-around', width: 140},
  price: {fontSize: 20, fontWeight: '600'},
  title: {},
  countIcon: {fontWeight: '700', fontSize: 20},
  counter: {justifyContent: 'space-around', alignItems: 'center'},
  Swipecontainer: {height: 100},
});
