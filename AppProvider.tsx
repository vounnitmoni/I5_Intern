/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const AppProvider: React.FC<PropsWithChildren> = ({children}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default AppProvider;
