import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../../screens/Auth/Register';
import LoginScreen from '../../screens/Auth/Login';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from './TypeNavigation';
import MoreInfoScreen from '../../screens/Auth/MorInfo';

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
  {
    name: ROUTES.CHOOSE_CATEGORY,
    component: LoginScreen,
  },
  {
    name: ROUTES.INIT_COMMUNITY,
    component: LoginScreen,
  },
  {
    name: ROUTES.MORE_INFO,
    component: MoreInfoScreen,
  },
];

const Navigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShadowVisible: false, headerTitle: ''}}>
      {AuthNavigationData.map((item: any, index: number) => {
        if(item.name == ROUTES.MORE_INFO){
            return (
              <AuthStack.Screen
                options={{
                  headerShown: false
                }}
                key={index}
                name={item.name}
                component={item.component}
              />
            );
        }else{
          return (
            <AuthStack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        }
      })}
    </AuthStack.Navigator>
  );
};

export default Navigator;
