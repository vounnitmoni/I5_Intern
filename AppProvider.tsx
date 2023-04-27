/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {PropsWithChildren, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/compoments/Nagivation/AuthNavigator';

const AppProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Auth.currentAuthenticatedUser()
    //   .then(user => {
    //     setAccessToken(user.signInUserSession.accessToken.jwtToken);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });

  if (accessToken === '') {
    return (
      <NavigationContainer>
        {/* <UpgradeDialog /> */}
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {/* <UpgradeDialog /> */}
      {children}
    </NavigationContainer>
  );
};

export default AppProvider;

