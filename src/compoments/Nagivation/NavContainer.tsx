import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import {RootStackParamList} from './TypeNavigation';
import Header from '../Header';
import Navigator from './Navigator';
import RightDrawer from './RightDrawer';
import SpecificQuestionScreen from '../../screens/SpecifiQuestionScreen';
import QuestionScreen from '../../screens/Question';

const Stack = createStackNavigator<RootStackParamList>();
const NavContainer = () => {
  const component = () =>{
    return(
      <Header />
    )
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: ()=> component()
      }}
    >
      <Stack.Group>
        <Stack.Screen name='Navigator' component={Navigator}/>
        <Stack.Screen name='RightDrawer' component={RightDrawer}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: true}}>
        <Stack.Screen name='SpecificQuestionScreen' component={SpecificQuestionScreen}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen options={{headerShown:false}} name='QuestionScreen' component={QuestionScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NavContainer;