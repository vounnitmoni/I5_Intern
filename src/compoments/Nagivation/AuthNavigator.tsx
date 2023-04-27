import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../../screens/Auth/Register';
import LoginScreen from '../../screens/Auth/Login';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from './TypeNavigation';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigationData = [
  {
    name: ROUTES.REGISTER,
    component: RegisterScreen,
  },
  {
    name: ROUTES.LOGIN,
    component: LoginScreen,
  },
];

const Navigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShadowVisible: false, headerTitle: ''}}>
      {AuthNavigationData.map((item: any, index: number) => {
        return (
          <AuthStack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};

export default Navigator;
