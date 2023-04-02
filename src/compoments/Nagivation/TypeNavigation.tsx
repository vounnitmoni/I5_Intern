import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  TabNavigation: undefined;
  HomeScreen: undefined;
  ScheduleScreen: undefined;
  NotificationScreen: undefined;
  SupportScreen: undefined;
};

export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;
