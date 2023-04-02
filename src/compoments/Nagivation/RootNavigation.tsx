import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import {RootStackParamList} from './TypeNavigation';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigation;
