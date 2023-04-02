import React from 'react';
import {Icon} from '@rneui/themed';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import ScheduleScreen from '../../screens/Schedule';
import SupportScreen from '../../screens/Support';
import {ROUTES} from '../../enums/RouteEnum';
import variables from '../../assets/styles/variables';
import NotificationScreen from '../../screens/Notfication';

const Tab = createBottomTabNavigator();

const bottoms = [
  {
    name: ROUTES.HOME,
    component: HomeScreen,
    label: 'Home',
    icon: 'md-home-outline',
  },
  {
    name: ROUTES.SCHEDULE,
    component: ScheduleScreen,
    label: 'Schedule',
    icon: 'videocam-outline',
  },
  {
    name: ROUTES.NOTIFICATION,
    component: NotificationScreen,
    label: 'Notification',
    icon: 'md-notifications-outline',
  },
  {
    name: ROUTES.SUPPORT,
    component: SupportScreen,
    label: 'Settings',
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
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({color, size}) => (
                <Icon
                  name={item.icon}
                  type="ionicon"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigation;
