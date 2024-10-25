import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import store from './src/store';
import AppNavigator from './src/routes/AppNavigator';
import i18n from './src/plugins/i18n';


const App = () => {
  return (
    <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>

    <Provider store={store}>
            <AppNavigator />
        </Provider>
                  </I18nextProvider>

    </SafeAreaProvider>

  );
};

export default App;