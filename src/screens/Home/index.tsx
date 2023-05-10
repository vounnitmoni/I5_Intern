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

interface IData{
  id: number;
  question: string;
  body: string; 
  post_duration: Date; 
  community: string;
  answer: number
  vote: number
}
type HomeScreen = StackNavigationProp<RootStackParamList, ROUTES.HOME>;
const HomeScreen : React.FC<{navigation: HomeScreen}> = ({navigation}) => {
  const [object, setObject] = useState<IData[]>([]);
  const bool = false;
  const action = useAppSelector(state => state.questionId.q_id)
  const dispatch = useAppDispatch();

  const setId = (id : number) =>{
    dispatch(click(id));
  }

  const flag = () =>{
    let f = 0;
    return f = f + 1;
  }
  useEffect(()=>{
    API.RandomQuestion({}).then(res => res.json()).then(async e => 
      setObject(e)
    );
  },[bool])
  const moreData = () =>{
    console.log()
  }
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
              onPress={()=> [setId(item.item.id), navigation.navigate('SpecificQuestionScreen')]}
            />
        </View>
    }
    onEndReached={()=> [moreData(), flag()]}
    scrollEnabled={true}
    
  />



    // <>
    //   {object.map((item, index)=>{
    //     return(
    //       <PostCard key={index} 
    //         title={item.question}
    //         description={item.body}
    //         community={item.community}
    //         onPress={()=> console.log(object.map(e => e.post_duration).reverse())}
    //       />
    //     )
    //   })}
    // </>

    // <>
    //   {object.map((item,index)=> {
    //     return(
    //       <View key={index} style={{padding: 10}}>
    //         <Text>{item.id}</Text>
    //         <Text>{item.question}</Text>
    //       </View>
    //     )
    //   })}
    // </>

  );
};

export default HomeScreen;