import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../components/Screen';
import BagCard from '../components/BagCard';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Bag = () => {
  const cart = useSelector(state => state.equipment.cart);
  const user = useSelector(state => state.equipment.userInfo.token);
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);
  const total = cart.reduce((accumulator, object) => {
    return accumulator + object.cost * object.count;
  }, 0);
  const ids = cart.map(item => item.product._id);
  console.log(cart, 'from bag', total, 'total', ids, user);
  useEffect(() => {
    !total && setDisabled(true);
  }, []);
  return (
    <Screen scrollView={false}>
      <AppText style={styles.title}>My Bag</AppText>
      <FlatList
        data={cart}
        style={{marginBottom: 200}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => (
          <BagCard item={item} style={{alignSelf: 'center'}} />
        )}
      />
      <View style={styles.fotter}>
        {total ? <AppText> total : {total.toFixed(2)}</AppText> : null}
        <AppButton
          style={[styles.btn, !total && {backgroundColor: 'gray'}]}
          title={'Process to Check out'}
          disabled={disabled}
          onPress={() => {
            navigation.navigate('CheckOut', {total, ids});
          }}
        />
      </View>
    </Screen>
  );
};

export default Bag;
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  fotter: {
    width: width,
    height: height * 0.3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    flex: 1,
    position: 'absolute',
    top: height - height * 0.32,
    alignItems: 'center',
    paddingVertical: 30,
  },
  btn: {marginTop: 20},
});
