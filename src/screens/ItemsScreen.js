import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../components/Screen';
import ItemCard from '../components/ItemCard';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import {useState} from 'react';
import {loadMoreProduct} from '../Redux/EqSlice';
import {apiCall} from '../api';
import {useIsFocused} from '@react-navigation/native';

const ItemsScreen = ({navigation, route}) => {
  const equipment = useSelector(state => state.equipment.ls);
  const wishList = useSelector(state => state.equipment.cart.wishList);
  const [bage, setBage] = useState(2);
  console.log(bage, 'bage');
  const focused = useIsFocused();
  const [searchval, setSearchVal] = useState('');
  const [length, setLength] = useState(null);
  const {category, id} = route?.params;
  const dispatch = useDispatch();
  useEffect(() => {
    setBage(2);
  }, [focused]);
  console.log([].length, 'array');
  useEffect(() => {
    apiCall(`product/parent-category?id=${id}&page=${bage}`, 'get')
      .then(res => {
        dispatch(loadMoreProduct(res?.data.data));
        setLength(res.data.data.length);
      })
      .then(res => {
        console.log(res, 'from item screen');
      })
      .catch(err => console.log(err, 'from item screen'));
  }, [bage]),
    console.log(wishList, 'wishList');
  console.log(equipment, 'equipment');

  return !equipment ? (
    <ActivityIndicator />
  ) : (
    <Screen scrollView={false} style={styles.container}>
      <AppText style={styles.text}>{category.split(' ')[0]}</AppText>

      <FlatList
        contentContainerStyle={{marginBottom: 50}}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={() =>
          length != 0 ? setBage(val => val + 1) : console.log('reach end')
        }
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <>
            <AppInput
              value={searchval}
              placeholder="Search"
              name="search"
              onChangeText={val => {
                setSearchVal(val);
              }}
            />
          </>
        )}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        data={
          searchval
            ? equipment.filter(item =>
                item.title.toLowerCase().includes(searchval),
              )
            : equipment
        }
        renderItem={({item}) => (
          <ItemCard
            item={item}
            id={id}
            category={category}
            navigation={navigation}
          />
        )}
      />
    </Screen>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10},
  text: {fontSize: 30, fontWeight: '800', marginBottom: 20},
});
