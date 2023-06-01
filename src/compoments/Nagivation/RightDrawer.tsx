import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigation from './RootNavigation';
import RightDrawerContent from '../MultipleDrawer/RightDrawerContent';

const Drawer = createDrawerNavigator();

const RightDrawer = () => {
  return (
    <Drawer.Navigator
      id="rightDrawer"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: '65%',
        },
      }}
      drawerContent={props => <RightDrawerContent {...props}/>}>
      <Drawer.Screen name="RootNavigation" component={RootNavigation} />
    </Drawer.Navigator>
  );
};

export default RightDrawer;