import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../components/Screen';
import AppText from '../components/AppText';
import CategoryCard from '../components/CategoryCard';
import AppInput from '../components/AppInput';
import {useSelector} from 'react-redux';

const Category = ({navigation}) => {
  const [searchVal, setSearchVal] = useState('');
  const category = useSelector(state => state.equipment.category);

  return (
    <Screen style={{padding: 10}}>
      <AppText style={styles.header}>Category</AppText>
      <AppInput
        style={styles.search}
        value={searchVal}
        placeholder="Search"
        name="search"
        onChangeText={val => {
          setSearchVal(val);
        }}
      />
      <CategoryCard
        style={{alignSelf: 'center'}}
        navigation={navigation}
        data={category}
        filter={searchVal.toLowerCase()}
      />
      <View style={{marginBottom: 60, height: 10}} />
    </Screen>
  );
};

export default Category;

const styles = StyleSheet.create({
  header: {fontSize: 40, fontWeight: '600'},
  search: {marginTop: 30, marginBottom: 20, alignSelf: 'center'},
});
