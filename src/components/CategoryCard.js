import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
const width = Dimensions.get('window').width;

const CategoryCard = ({data, filter, navigation, onPress, style}) => {
  if (filter) {
    return data
      .filter(item => item.name.includes(filter))
      .map(item => (
        <TouchableOpacity
          key={item._id}
          onPress={() =>
            navigation.navigate('ItemsScreen', {category: item.name})
          }
          style={[styles.Card, style]}>
          <View style={styles.priceContainer}>
            <AppText>{item.name}</AppText>
          </View>
          <Image
            style={styles.img}
            source={{
              uri:
                'http://www.rncourseproject.com/app/category/get-parents/' +
                item.image,
            }}
          />
        </TouchableOpacity>
      ));
  } else {
    return data.map(item => (
      <TouchableOpacity
        key={item._id}
        onPress={() =>
          navigation.navigate('ItemsScreen', {category: item.name})
        }
        style={[styles.Card, style]}>
        <View style={styles.priceContainer}>
          <AppText>{item.name}</AppText>
        </View>
        <Image
          style={styles.img}
          source={{
            uri: `http://www.rncourseproject.com/uploads/cat-thumbs/resized/${item.image}`,
          }}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    ));
  }
};
export default CategoryCard;

const styles = StyleSheet.create({
  Card: {
    width: width * 0.9,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
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
});
