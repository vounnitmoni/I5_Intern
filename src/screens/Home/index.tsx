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
import { updateUserAttributes } from '../../store/userInfoReducer';
import { IUserAtt } from '../../interfaces/IAPI';

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
type HomeScreen = StackNavigationProp<RootStackParamList, ROUTES.HOME>;
const HomeScreen : React.FC<{navigation: HomeScreen}> = ({navigation}) => {
  const [object, setObject] = useState<IData[]>([]);
  const [userAttribute, setAttribute] = useState<IUserAtt>();
  const bool = false;
  const action = useAppSelector(state => state.questionId.q_id)
  const userInfoStateChanged = useAppSelector(state => state.userInfoReducer.state)
  const dispatch = useAppDispatch();

  const setId = (id : number) =>{
    dispatch(click(id));
  }

  const flag = () =>{
    let f = 0;
    return f = f + 1;
  }

  useEffect(()=>{
    API.ShortUserInfo({})
      .then(res => res.json())
      .then(async data => {
        if(data.status === 200){
          setAttribute(data);
        }
      })
  },[userInfoStateChanged])

  useEffect(()=>{
    if(userAttribute){
      dispatch(updateUserAttributes({
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