import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WishListCard from '../components/WishListCard';
import {useSelector} from 'react-redux';
import {Screen} from '../components/Screen';
import AppText from '../components/AppText';

const WishList = () => {
  const data = useSelector(state => state.equipment.wishList);
  console.log(data);
  return (
    <Screen style={{padding: 10}} scrollView={false}>
      <AppText style={styles.title}>WishList</AppText>
      <WishListCard data={data} />
    </Screen>
  );
};

export default WishList;

const styles = StyleSheet.create({
  title: {fontSize: 30, fontWeight: '600', marginBottom: 30},
});
