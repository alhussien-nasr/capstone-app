import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Screen} from '../components/Screen';
import ItemCard from '../components/ItemCard';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import {useState} from 'react';
import {categoriesSelector} from '../store/categories/categoriesSelector';
const ItemsScreen = ({navigation, route}) => {
  const {title} = route?.params;
  const categoriesMap = useSelector(categoriesSelector);
  const products = categoriesMap[title];

  console.log(categoriesMap, products, 'catt');

  const [searchval, setSearchVal] = useState('');
  const Header = () => {
    return (
      <>
        <AppText style={styles.text}>{title}</AppText>
        <AppInput
          value={searchval}
          placeholder="Search"
          name="search"
          style={{marginBottom: 30}}
          onChangeText={val => {
            setSearchVal(val);
          }}
        />
      </>
    );
  };
  return (
    <Screen scrollView={false} style={styles.container}>
      <FlatList
        contentContainerStyle={{marginBottom: 50}}
        numColumns={2}
        ListHeaderComponent={Header()}
        stickyHeaderHiddenOnScroll={true}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        data={products.filter(item =>
          item.name.toLowerCase().includes(searchval.toLowerCase()),
        )}
        renderItem={({item}) => (
          <ItemCard item={item} category={products} navigation={navigation} />
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
