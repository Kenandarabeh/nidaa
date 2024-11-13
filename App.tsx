import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { I18nextProvider } from 'react-i18next';
import store from './src/store';
import AppNavigator from './src/routes/AppNavigator';
import i18n from './src/plugins/i18n';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <PaperProvider>
          <Provider store={store}>
              <AppNavigator />
          </Provider>
          </PaperProvider>
        </I18nextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
