import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import {RootStackParamList} from './TypeNavigation';
import Header from '../Header';
import Navigator from './Navigator';
import RightDrawer from './RightDrawer';

const Stack = createStackNavigator<RootStackParamList>();
const NavContainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name='Navigator' component={Navigator}/>
        <Stack.Screen name='RightDrawer' component={RightDrawer}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NavContainer;