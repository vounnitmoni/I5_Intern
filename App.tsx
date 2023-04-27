/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import AppProvider from './AppProvider';
import Navigator from './src/compoments/Nagivation/Navigator';
import {persistor, store} from './src/store';
import './i18n.config';

const theme = createTheme({
  lightColors: {
    primary: '#3BC2D7',
  },
  darkColors: {
    primary: '#3BC2D7',
  },
  mode: 'light',
  components: {
    Text: {
      h1Style: {
        fontWeight: '700',
      },
      h2Style: {
        fontWeight: '700',
      },
      h3Style: {
        fontWeight: '700',
      },
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
      labelStyle: {
        fontSize: 16,
      },
      inputStyle: {
        fontSize: 14,
      },
    },
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />

            <AppProvider>
              <Navigator />
            </AppProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

