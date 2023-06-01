import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigation from './RootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './TypeNavigation';
import { ROUTES } from '../../enums/RouteEnum';
import RightDrawer from './RightDrawer';

const Drawer = createDrawerNavigator();
type navigationDrawer = StackNavigationProp<RootStackParamList, ROUTES.NAVIGATOR>

const Navigator = () => {
  return (
    <Drawer.Navigator
    id='leftDrawer'
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: '80%',
        },
      }}>
      <Drawer.Screen name="RightDrawer" component={RightDrawer} />
    </Drawer.Navigator>
  );
};

export default Navigator;
