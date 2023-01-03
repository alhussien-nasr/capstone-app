import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
const width = Dimensions.get('window').width;
const Card = ({data, navigation, style}) => {
  const minPrice = [...data];
  return minPrice
    ?.sort((a, b) => a.price - b.price)
    .splice(0, 3)
    .map((item, index) => (
      <TouchableOpacity
        key={item._id}
        onPress={() => navigation.navigate('ItemDetails', {id: item._id})}
        style={[styles.Card, style]}>
        {console.log(index)}
        <Image
          style={styles.img}
          source={{
            uri:
              item?.images &&
              `http://www.rncourseproject.com/uploads/products/${item?.images[0]}`,
          }}
          resizeMode="stretch"
        />
        <View style={styles.priceContainer}>
          <AppText style={{maxWidth: 130}} numberOfLines={1}>
            {item.title}
          </AppText>
          <AppText>{item.price}$</AppText>
        </View>
      </TouchableOpacity>
    ));
};

export default Card;

const styles = StyleSheet.create({
  Card: {
    width: width * 0.9,
    height: 100,
    backgroundColor: 'white',
    marginVertical: 15,
    borderRadius: 20,
    flexDirection: 'row',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
  },
  img: {
    width: '40%',
    height: '100%',
    borderRadius: 20,
  },
  priceContainer: {marginLeft: 40, justifyContent: 'space-around'},
});
