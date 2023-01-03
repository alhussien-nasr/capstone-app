import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import {addTowishList} from '../Redux/EqSlice';
import {useDispatch, useSelector} from 'react-redux';

const width = Dimensions.get('window').width;

const ItemCard = ({item, navigation}) => {
  const wishlist = useSelector(state => state.equipment.wishList);

  const dispatch = useDispatch();
  const liked = id => {
    const found = wishlist.find(item => item._id == id);
    return found ? true : false;
  };
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetails', {id: item._id})}
      style={styles.Itemcontainer}>
      <Image
        source={{
          uri: `http://www.rncourseproject.com/uploads/products/${item?.images[0]}`,
        }}
        style={styles.img}
        resizeMode="stretch"
      />
      <AppText numberOfLines={2} style={styles.name}>
        {item.title}
      </AppText>
      <AppText style={styles.price}>${item.price}</AppText>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(addTowishList(item))}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 10,
          width: 34,
          height: 34,
        }}>
        <Icon
          size={34}
          style={{
            position: 'absolute',
            tintColor: 'red',
            shadowOpacity: item.liked && 0.3,
            shadowColor: 'rgb(39,	72	,220	)',
            shadowOffset: {width: 0, height: 6},
          }}
          name={liked(item._id) ? 'heart' : 'heart-outline'}
          color={liked(item._id) ? 'rgb(39,	72	,220	)' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  Itemcontainer: {
    backgroundColor: 'white',
    width: width * 0.4,
    height: 250,
    marginVertical: 15,
    borderRadius: 15,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
    overflow:'hidden'
  },
  img: {width: '100%', height: '50%', overflow: 'hidden'},
  name: {
    color: 'rgb(33,37,80)',
    marginTop: 20,
    fontWeight: '600',
    fontSize: 15,
  },
  price: {
    color: 'rgb(33,37,80)',
    fontWeight: '800',
    fontSize: 18,
    bottom: 20,
    left: 10,
    position: 'absolute',
  },
});
