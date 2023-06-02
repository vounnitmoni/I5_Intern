import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../../screens/Auth/Register';
import LoginScreen from '../../screens/Auth/Login';
import {ROUTES} from '../../enums/RouteEnum';
import {AuthStackParamList} from './TypeNavigation';
import MoreInfoScreen from '../../screens/Auth/MorInfo';
import ChooseCategoryScreen from '../../screens/Auth/ChooseCategory';
import FirstJoinCommunityScreen from '../../screens/Auth/JoinCommunity';

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
    component: ChooseCategoryScreen,
  },
  {
    name: ROUTES.INIT_COMMUNITY,
    component: FirstJoinCommunityScreen,
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
        if(index === 2 || index === 3 || index === 4){
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

// cardStyle:{
//   backgroundColor: 'black'
// }
