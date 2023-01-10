import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../components/Screen';
import BagCard from '../components/BagCard';
import {useDispatch, useSelector} from 'react-redux';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Bag = () => {
  const {cartItems, cartTotal} = useSelector(state => state.cart);
  const navigation = useNavigation();

  const {presentPaymentSheet, initPaymentSheet} = useStripe();

  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `https://stripe-server-hb6hrxyf9-alhussien-nasr.vercel.app/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: cartTotal * 100}),
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [cartTotal]);

  return (
    <Screen scrollView={false}>
      <AppText style={styles.title}>My Bag</AppText>
      <FlatList
        data={cartItems}
        style={{marginBottom: 200}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => (
          <BagCard item={item} style={{alignSelf: 'center'}} />
        )}
      />
      <View style={styles.fotter}>
        {cartTotal ? <AppText> total : {cartTotal.toFixed(2)}</AppText> : null}
        {!loading ? (
          <ActivityIndicator />
        ) : (
          <AppButton
            style={[styles.btn, !cartTotal && {backgroundColor: 'gray'}]}
            title={'Process to Check out'}
            disabled={cartTotal ? false : true}
            onPress={openPaymentSheet}
          />
        )}
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
