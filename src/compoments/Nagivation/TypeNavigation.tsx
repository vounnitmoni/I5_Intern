import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  TabNavigation: undefined;
  HomeScreen: undefined;
  ScheduleScreen: undefined;
  NotificationScreen: undefined;
  SupportScreen: undefined;
  Navigator: undefined;
  QuestionScreen: undefined;
  RightDrawer: undefined;
  SpecificQuestionScreen: undefined;
  CommunityListScreen: undefined;
  Header: undefined;
  BookMarkScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
  UserProfileScreen: undefined;
  CreateCommunityScreen: undefined;
  FirstJoinCommunityScreen: undefined;
};

export type AuthStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
  MoreInfoScreen: undefined;
  ChooseCategoryScreen: undefined;
  FirstJoinCommunityScreen: undefined;
  TabNavigation: undefined;
  // ConfirmScreen: {
  //   email: string;
  // };
};

export type SpecificTopStackParamList = {
  AboutScreen: undefined;
  PostScreen: undefined;
}

export type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList>;
export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;
export type CommunityAndUserTopNavigationProps = NativeStackScreenProps<SpecificTopStackParamList>;
