import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigation from './RootNavigation';

const Drawer = createDrawerNavigator();

const RightDrawer = () => {
  return (
    <Drawer.Navigator
      id="right"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: '80%',
        },
      }}>
      <Drawer.Screen name="RootNavigation" component={RootNavigation} />
    </Drawer.Navigator>
  );
};

export default RightDrawer;