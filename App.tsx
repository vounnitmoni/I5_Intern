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
import {createTheme, ThemeProvider} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import AppProvider from './AppProvider';
import Navigator from './src/compoments/Nagivation/Navigator';

const theme = createTheme({
  lightColors: {},
  darkColors: {},
  mode: 'light',
  components: {},
});

const App = () => {
  return (
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
  );
};

export default App;
