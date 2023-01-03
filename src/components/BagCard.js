import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState} from 'react';
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  removeItemfromCart,
  clearItem,
} from '../store/cart/cartActions';

const width = Dimensions.get('window').width;
const BagCard = ({item, style}) => {
  const {cartItems} = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const addItemtoCartHandler = () => {
    dispatch(addItemToCart(cartItems, item));
  };
  const remiveItemfromCartHandler = () => {
    dispatch(removeItemfromCart(cartItems, item));
  };
  const clearItemHandler = () => {
    dispatch(clearItem(cartItems, item.id));
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
            <TouchableOpacity onPress={clearItemHandler}>
              <Icon name="delete" size={30} />
            </TouchableOpacity>
          </SwipeButtonsContainer>
        }>
        <View style={[styles.container, style]}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.img}
            resizeMode="stretch"
          />
          <View style={styles.details}>
            <AppText numberOfLines={2} style={styles.title}>
              {item.name}
            </AppText>
            <AppText style={styles.price}>${item.price}</AppText>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity onPress={addItemtoCartHandler}>
              <AppText style={styles.countIcon}>+</AppText>
            </TouchableOpacity>
            <AppText>{item.quantity}</AppText>
            <TouchableOpacity onPress={remiveItemfromCartHandler}>
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
  img: {height: '100%', width: '30%', marginRight: 20, borderRadius: 15},
  details: {justifyContent: 'space-around', width: 140},
  price: {fontSize: 20, fontWeight: '600'},
  title: {},
  countIcon: {fontWeight: '700', fontSize: 20},
  counter: {justifyContent: 'space-around', alignItems: 'center'},
  Swipecontainer: {height: 100},
});
