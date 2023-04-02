import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigation from './RootNavigation';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: '100%',
        },
      }}>
      <Drawer.Screen name="RootNavigation" component={RootNavigation} />
    </Drawer.Navigator>
  );
};

export default Navigator;
