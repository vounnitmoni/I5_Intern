import React, {useState, useEffect} from 'react';
import PostCard from '../../compoments/Post/PostCard';
import API from '../../api';
import { Text } from '@rneui/base';
import {FlatList, View} from 'react-native';
import { Column, Stack } from '@mobily/stacks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { click } from '../../store/questionId';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../compoments/Nagivation/TypeNavigation';
import { ROUTES } from '../../enums/RouteEnum';
import { updateAppUserAttributes } from '../../store/userInfoReducer';
import { IUserAtt } from '../../interfaces/IAPI';
import { communityListAttribute } from '../../store/userCommunityListReducer';

interface IData{
  id: number;
  question: string;
  body: string; 
  post_duration: Date; 
  community: string;
  answer: number;
  vote: number;
  photo: string[];
}

interface IUserCommunityShortInfo {
  id?: number;
  name?: string;
}

type HomeScreen = StackNavigationProp<RootStackParamList, ROUTES.HOME>;
const HomeScreen : React.FC<{navigation: HomeScreen}> = ({navigation}) => {
  const [object, setObject] = useState<IData[]>([]);
  const [userAttribute, setAttribute] = useState<IUserAtt>({});
  const [userCommunity, setUserCommunity] = useState<IUserCommunityShortInfo[]>([])
  const bool = false;
  const action = useAppSelector(state => state.questionId.q_id)
  const userInfoStateChanged = useAppSelector(state => state.userInfoReducer.state)
  const dispatch = useAppDispatch();

  const setId = (id : number) =>{
    dispatch(click(id));
  }

  useEffect(()=>{
    API.UserCommunity(null)
       .then(res => res.json())
       .then(data => {
          setUserCommunity(data)
       })
  },[])

  useEffect(()=>{
    if(userCommunity.length != 0){
      // userCommunity.forEach((e : IUserCommunityShortInfo) => dispatch(communityListAttribute([...e, {name: e.name, id: e.id}])))
      Array.from(userCommunity, child => {
        dispatch(communityListAttribute(child))
      })
    }
  },[userCommunity])

  useEffect(()=>{
    API.ShortUserInfo(null)
      .then(res => res.json())
      .then(data => {
          setAttribute({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            phone_number: data.phone_number,
            name_shortcut: data.name_shortcut,
            bio: data.bio,
            followee: data.followee,
            follower: data.follower,
            profile_pic: data.profile_pic,
            cover_pic: data.cover_pic,
          });
      })
  },[userInfoStateChanged])

  useEffect(()=>{
    if(userAttribute){
      dispatch(updateAppUserAttributes({
        id: userAttribute?.id,
        firstname: userAttribute?.firstname,
        lastname: userAttribute?.lastname,
        username: userAttribute?.username,
        email: userAttribute?.email,
        name_shortcut: userAttribute?.name_shortcut,
        phone_number: userAttribute?.phone_number,
        followee: userAttribute?.followee,
        follower: userAttribute?.follower,
        profile_pic: userAttribute?.profile_pic,
        cover_pic: userAttribute?.cover_pic,
        bio: userAttribute?.bio,
      }))
    }
  },[userAttribute])

  useEffect(()=>{
    API.RandomQuestion({})
      .then(res => res.json())
      .then(async e => 
        setObject(e)
      );
  },[bool])

  return (
    <FlatList 
      data={object}
      renderItem={(item)=>
        <View style={{paddingBottom: 5}}>
          <PostCard
              title={item.item.question}
              description={item.item.body}
              community={item.item.community}
              answer={item.item.answer}
              vote={item.item.vote}
              image={item.item.photo}
              onPress={()=> [setId(item.item.id), navigation.navigate('SpecificQuestionScreen')]}
            />
        </View>
    }
  />
  );
};

export default HomeScreen;