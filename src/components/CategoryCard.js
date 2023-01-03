import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CategoryCard = ({data, filter, navigation, onPress, style}) => {
  return data
    .filter(item => item.title.includes(filter))
    .map(item => (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate('ItemsScreen', {title: item.title})}
        style={[styles.Card, style]}>
        <ImageBackground
          style={styles.img}
          source={{
            uri: item.imageUrl,
          }}>
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>{item.title}</AppText>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    ));
};
export default CategoryCard;

const styles = StyleSheet.create({
  Card: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    borderRadius: 20,
    width: width * 0.45,
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  title: {color: 'white', fontSize: 25, fontWeight: '600'},
});
