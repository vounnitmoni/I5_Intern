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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from './src/store/hooks';

const AppProvider: React.FC<PropsWithChildren> = ({children}) => {
  const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
  const [accessToken, setAccessToken] = useState<string | null>('');
  const token = async () =>{
    const test = await AsyncStorage.getItem("token").then((res)=> {
      if(res == null){
        setAccessToken('');
      }else{
        setAccessToken(res);
      }
    })
  }
  
    useEffect(()=>{
      token();
    },[action]);

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

