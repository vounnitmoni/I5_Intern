import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  TabNavigation: undefined;
  HomeScreen: undefined;
  ScheduleScreen: undefined;
  NotificationScreen: undefined;
  SupportScreen: undefined;
  Navigator: undefined;
  QuestionScreen: undefined;
  AnswerQuestionScreen: undefined;
  RightDrawer: undefined;
  SpecificQuestionScreen: undefined;
  CommunityListScreen: undefined;
  MainHeader: undefined;
  BookMarkScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
  UserProfileScreen: undefined;
  CreateCommunityScreen: undefined;
  FirstJoinCommunityScreen: undefined;
  CommunityScreen: undefined;
  UserPostScreen: undefined;
  CommunityPostScreen: undefined;
  SearchScreen: undefined;
  CommunitySearch: undefined;
  QuestionSearch: undefined;
  UserSearch: undefined;
  FollowModal: undefined;
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
