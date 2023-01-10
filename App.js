import 'react-native-gesture-handler';
import {I18nManager} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {AppStack} from './src/navigation/AppStack';
import {StripeProvider} from '@stripe/stripe-react-native';

I18nManager.allowRTL(false);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StripeProvider publishableKey="pk_test_51MLRwsK1laAoewbCONkr7O5BKnKN6KEQj0skaAmCI7xcGN0jI8IONf90NmDSseBAsFQXIiGdu6Y0yclUokXIwnXl00VgvowXsq">
            <AppStack />
          </StripeProvider>
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
