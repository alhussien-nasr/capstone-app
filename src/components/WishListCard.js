import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import {useDispatch, useSelector} from 'react-redux';
import {addToBag, removeFromWihList, setCart} from '../Redux/EqSlice';
import {createNavigationContainerRef} from '@react-navigation/native';
import {apiCall} from '../api';

const width = Dimensions.get('window').width;
const WishListCard = ({data, increment}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.equipment.userInfo.token);

  const addProduct = item => {
    apiCall(
      'cart',
      'post',
      {
        product: item._id,
        cost: item.price,
        count: 1,
      },
      token,
    )
      .then(res => {
        console.log(res, 'ok');
        apiCall(`cart`, 'get', undefined, token)
          .then(res => {
            console.log(res.data, 'targer');
            dispatch(setCart(res.data.items));
          })
          .catch(err => confirm.log(err, 'from cart'));
      })
      .catch(err => console.log(err));
  };
  return (
    <FlatList
      data={data}
      contentContainerStyle={{alignItems: 'center'}}
      ItemSeparatorComponent={() => <View style={{height: 20}} />}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <View style={styles.Swipecontainer}>
          <View style={styles.container}>
            <Image
              source={{
                uri: `http://www.rncourseproject.com/uploads/products/${item?.images[0]}`,
              }}
              style={styles.img}
              resizeMode="stretch"
            />
            <View style={styles.details}>
              <AppText numberOfLines={2} style={styles.title}>
                {item.title}
              </AppText>
              <AppText style={styles.price}>${item.price}</AppText>
            </View>
            <View>
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => addProduct(item)}>
                  <Icon name="plus" size={30} />
                </TouchableOpacity>
              </View>

              <View style={styles.icon}>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromWihList(item))}>
                  <Icon name="delete" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default WishListCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  img: {height: '100%', width: '30%', marginRight: 20},
  details: {justifyContent: 'space-around', width: 160},
  price: {fontSize: 20, fontWeight: '600'},
  Swipecontainer: {height: 100},
  icon: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgb(239	,237	,242	)',
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 7,
  },
});
