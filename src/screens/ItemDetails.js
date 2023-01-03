import {StyleSheet, View, Dimensions, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {addItemToCart} from '../store/cart/cartActions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ItemDetails = ({route}) => {
  const {item} = route.params;
  console.log(item);
  const cartItems = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, item));
    console.log(cartItems, 'cart');
  };
  console.log(cartItems, 'cart');

  return (
    <View style={styles.screen}>
      <Image
        style={styles.img}
        resizeMode={'stretch'}
        source={{
          uri: item?.imageUrl,
        }}></Image>
      <View style={styles.fotter}>
        <AppText style={styles.title}>{item?.name}</AppText>
        <AppText style={styles.title}>${item?.price}</AppText>
        <AppButton
          title={'add to cart'}
          name="inbox"
          style={styles.btn}
          onPress={addItemHandler}
        />
      </View>
    </View>
  );
};
export default ItemDetails;

const styles = StyleSheet.create({
  screen: {flex: 1},
  ImgContainer: {
    width: width,
    marginBottom: 15,
  },
  img: {width: '100%', height: height * 0.7},
  title: {fontSize: 20, fontWeight: '600', marginVertical: 10},
  fotter: {
    width: width,
    height: height * 0.33,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  countIcon: {fontWeight: '700', fontSize: 30, color: 'rgb(39	,73	,220	)'},
  row: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    alignSelf: 'center',
  },
  btn: {alignSelf: 'center', marginTop: 20},
});
