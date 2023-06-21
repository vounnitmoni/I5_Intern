import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import {RootStackParamList} from './TypeNavigation';
import Header from './../Header';
import Navigator from './Navigator';
import SearchScreen from '../SearchBar/Search';
import MainHeader from './../Header';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <MainHeader />
      }}
    >
      <Stack.Group>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        {/* <Stack.Screen name="Navigator" component={Navigator}/> */}
        {/* <Stack.Screen name="Header" component={Header}/> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigation;
