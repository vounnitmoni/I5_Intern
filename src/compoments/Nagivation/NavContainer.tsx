import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import {RootStackParamList} from './TypeNavigation';
import Header from '../Header';
import Navigator from './Navigator';
import RightDrawer from './RightDrawer';
import SpecificQuestionScreen from '../../screens/SpecifiQuestionScreen';
import QuestionScreen from '../../screens/Question';
import CommunityListScreen from '../../screens/Question/communityList';
import ProfileScreen from '../../screens/ProfileScreen';
import SettingScreen from '../../screens/SettingScreen';
import BookMarkScreen from '../../screens/BookMarkScreeen';
import UserProfileScreen from '../CommunityAndProfile/UserProfile';
import CreateCommunityScreen from '../../screens/CreateCommunitySCreen';
import HomeScreen from '../../screens/Home';
import CommunityScreen from '../CommunityAndProfile/CommunityProfile';

const Stack = createStackNavigator<RootStackParamList>();
const NavContainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Group>
        <Stack.Screen name='Navigator' component={Navigator}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: true}}>
        <Stack.Screen name='SpecificQuestionScreen' component={SpecificQuestionScreen}/>
        <Stack.Screen name='SettingScreen' component={SettingScreen}/>
        <Stack.Screen name='BookMarkScreen' component={BookMarkScreen}/>
        <Stack.Screen options={{headerTitle: 'Create a community'}} name='CreateCommunityScreen' component={CreateCommunityScreen}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name='QuestionScreen' component={QuestionScreen}/>
        <Stack.Screen name='CommunityListScreen' component={CommunityListScreen}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: true}}>
        <Stack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
        <Stack.Screen name='CommunityScreen' component={CommunityScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NavContainer;