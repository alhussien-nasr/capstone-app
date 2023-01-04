import 'react-native-gesture-handler';
import {I18nManager} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {AppStack} from './src/navigation/AppStack';
import {useEffect} from 'react';

useEffect(() => {
  I18nManager.allowRTL(false);
}, []);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
