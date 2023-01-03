import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Screen} from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {useState} from 'react';
import {setCart} from '../Redux/EqSlice';
import {apiCall} from '../api';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ItemDetails = ({route}) => {
  const [count, setCount] = useState(0);

  const {id} = route.params;
  console.log(id);
  const equipment = useSelector(state =>
    state.equipment.ls.filter(item => item._id == id),
  )[0];
  console.log(equipment);

  const dispatch = useDispatch();
  const token = useSelector(state => state.equipment.userInfo.token);

  const addProduct = () => {
    if (count > 0) {
      apiCall(
        'cart',
        'post',
        {
          product: equipment._id,
          cost: equipment.price,
          count: count,
        },
        token,
      )
        .then(res => {
          console.log(res, 'ok');
          apiCall(`cart`, 'get', undefined, token)
            .then(res => {
              console.log(res.data, 'targer');
              dispatch(setCart(res.data.items));
            })
            .catch(err => confirm.log(err, 'from cart'));
        })
        .catch(err => console.log(err));
    } else {
      console.log('noItem');
    }
  };

  return !equipment ? (
    <ActivityIndicator />
  ) : (
    <Screen style={styles.screen} scrollView={false}>
      <View style={styles.ImgContainer}>
        <AppText style={styles.title}>{equipment.title}</AppText>
        <Image
          style={styles.img}
          resizeMode={'contain'}
          source={{
            uri: `http://www.rncourseproject.com/uploads/products/${equipment?.images[0]}`,
          }}
        />
      </View>
      <View style={styles.details}>
        <AppText style={styles.title}>${equipment.price}</AppText>
      </View>
      <View style={styles.fotter}>
        <AppText style={{fontWeight: '500'}}>Qty</AppText>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setCount(count => (count == 0 ? count : count - 1));
            }}>
            <AppText style={styles.countIcon}> - </AppText>
          </TouchableOpacity>
          <AppText>{count}</AppText>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}>
            <AppText style={styles.countIcon}>+</AppText>
          </TouchableOpacity>
        </View>
        <AppButton
          title={'add to bag'}
          name="inbox"
          style={styles.btn}
          onPress={addProduct}
        />
      </View>
    </Screen>
  );
};
export default ItemDetails;

const styles = StyleSheet.create({
  ImgContainer: {
    width: width,
    height: height * 0.4,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  img: {width: '80%', height: '70%', alignSelf: 'center'},
  title: {fontSize: 20, fontWeight: '600', marginVertical: 10, marginLeft: 20},
  fotter: {
    width: width,
    height: height * 0.3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    flex: 1,
    position: 'absolute',
    top: height - height * 0.38,
    alignItems: 'center',
    paddingVertical: 30,
  },
  countIcon: {fontWeight: '700', fontSize: 30, color: 'rgb(39	,73	,220	)'},
  row: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
});
