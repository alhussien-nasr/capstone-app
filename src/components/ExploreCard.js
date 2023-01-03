import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import React, {useState} from 'react';
import AppText from './AppText';
import Carousel from 'react-native-anchor-carousel';

const width = Dimensions.get('window').width;

const Card = ({imgStyle, cardStyle, data, navigation}) => {
  const carouselRef = React.useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex, carouselRef);

  return (
    <>
      <Carousel
        itemWidth={width * 0.8}
        contentContainerStyle={styles.Carousel}
        height={350}
        mode="parallax"
        ref={carouselRef}
        data={data}
        separatorWidth={5}
        windowSize={width}
        key={({item}) => {
          item.id;
        }}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={[
                  styles.card,
                  index == 0 && {paddingLeft: 40},
                  index == data.length - 1 && {paddingRight: 40},
                  cardStyle,
                ]}
                onPressOut={() => {
                  setCurrentIndex(index);
                }}
                onPress={() => {
                  carouselRef.current.scrollToIndex(index);
                  navigation.navigate('ItemDetails', {item});
                }}>
                <View style={styles.imgContainer}>
                  <Image
                    style={[styles.img, imgStyle]}
                    source={{
                      uri: item.imageUrl,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <AppText numberOfLines={1} style={styles.title}>
                  {item.name}
                </AppText>
                <AppText style={styles.price}>${item.price} </AppText>
              </TouchableOpacity>
            </>
          );
        }}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (currentIndex === 0) return;
            carouselRef.current.scrollToIndex(currentIndex - 1);
            setCurrentIndex(currentIndex - 1);
          }}>
          <AppText> {`<`} </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (currentIndex === data.length) return;
            carouselRef.current.scrollToIndex(currentIndex + 1);
            setCurrentIndex(currentIndex + 1);
          }}>
          <AppText> {`>`} </AppText>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 350,
    width: width * 0.8,
    borderRadius: 20,
    borderColor: 'gray',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'white',
  },

  img: {
    width: width * 0.67,
    height: width * 0.67,
    borderRadius: (width * 0.68) / 2,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    bottom: 0,
  },
  title: {fontSize: 28, fontWeight: '600', marginHorizontal: 10},
  price: {fontSize: 25, fontWeight: '700'},
});
