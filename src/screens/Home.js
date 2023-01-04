import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../components/Screen';
import AppText from '../components/AppText';
import ExploreCard from '../components/ExploreCard';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {category} from '../Data/category';
import {CATEGORIES_TYPES} from '../store/categories/categoriesTypes';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const categories = useSelector(store =>
    store.categories.categories
      .reduce((acc, next) => {
        acc.push(...next.items);
        return acc;
      }, [])
      .sort(() => 0.5 - Math.random())
      .slice(0, 6),
  );
  const loading=useSelector(store=>store.categories.loading)
  console.log(categories, 'catt');

  useEffect(() => {
    SplashScreen.hide();
    dispatch({type: CATEGORIES_TYPES.FETCH_CATEGORIES_START});
  }, []);
  return (
    <Screen>
      <View style={styles.row}>
        <AppText style={styles.text}>Category</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('CategoryStack')}>
          <AppText style={{fontSize: 16, color: 'rgb(14	,139,	224	)'}}>
            see all
          </AppText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={category}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ItemsScreen', {
                title: item.title,
              })
            }
            style={styles.CategoryCard}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{
                uri: item.imageUrl,
              }}></Image>
            <AppText numberOfLines={1} style={{color: 'black'}}>
              {item.title}
            </AppText>
          </TouchableOpacity>
        )}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ExploreCard data={categories} navigation={navigation} />
      )}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {fontSize: 30, fontWeight: '700', lineHeight: 40, marginLeft: 20},
  flatlsH: {
    marginVertical: 10,
  },
  CategoryCard: {
    width: 150,
    height: 150,
    borderRadius: 17,
    paddingBottom: 5,
    paddingLeft: 5,
    marginVertical: 30,
    alignItems: 'center',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.6,
    shadowColor: 'gray',
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'rgb(240	,240	,244)',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    alignItems: 'flex-end',
    marginTop: 30,
  },
  img: {minWidth: 120, height: 120, borderRadius: 60},
  title: {fontWeight: '700', fontSize: 20, marginTop: 5},
});
