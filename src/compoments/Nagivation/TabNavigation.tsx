import React, { useState } from 'react';
import {Icon} from '@rneui/themed';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import SupportScreen from '../../screens/Support';
import {ROUTES} from '../../enums/RouteEnum';
import variables from '../../assets/styles/variables';
import NotificationScreen from '../../screens/Notfication';
import QuestionScreen from '../../screens/Question';

const Tab = createBottomTabNavigator();

const bottoms = [
  {
    name: ROUTES.HOME,
    component: HomeScreen,
    label: 'Home',
    type: 'ionicon',
    icon: 'md-home-outline',
  },
  {
    name: ROUTES.QUESTION,
    component: QuestionScreen,
    label: 'Question',
    type: '',
    icon: 'question-answer',
  },
  {
    name: ROUTES.NOTIFICATION,
    component: NotificationScreen,
    label: 'Notification',
    type: 'ionicon',
    icon: 'md-notifications-outline',
  },
  {
    name: ROUTES.SUPPORT,
    component: SupportScreen,
    label: 'Settings',
    type: 'ionicon',
    icon: 'settings-outline',
  },
];

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: variables.fontSizeSm,
          fontWeight: variables.fontWeightRegular,
        },
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          height: 56,
          marginTop: 6,
        },
      }}>
      {bottoms.map((item, index) => {
        if(item.label == 'Question'){
          return(
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  tabBarLabel: item.label,
                  tabBarIcon: ({color, size}) => (
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color={color}
                      size={size}
                    />
                  ),
                  tabBarStyle:{display: 'none'}
                  
                }}
              />
            );
        }else{
          return(
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({color, size}) => (
                  <Icon
                    name={item.icon}
                    type={item.type}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          )
        }
      })}
    </Tab.Navigator>
  );
};

export default TabNavigation;
