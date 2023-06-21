import React, {useState, useEffect, useRef} from 'react';
import API from '../../api';
import {FlatList, View} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { click } from '../../store/questionId';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../compoments/Nagivation/TypeNavigation';
import { ROUTES } from '../../enums/RouteEnum';
import { updateAppUserAttributes } from '../../store/userInfoReducer';
import { IUserAtt } from '../../interfaces/IAPI';
import { communityListAttribute } from '../../store/userCommunityListReducer';
import QuestionCard from '../../compoments/CommunityAndProfile/Components/QuestionCard';
import { setCommunityId, setUserId } from '../../store/IdReducer';
import { VoteStatus } from '../../enums/EVoteStatus';
import AnswerBottomSheet from '../../compoments/BottomSheet/AnswerBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';

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
  image?: string;
}

interface IQInfo{
  question_id?: number;
  community_id?: number;
  author_id?: number;
  community_image?: string;
  community_name?: string;
  author_name?: string;
  question?: string;
  description?: string;
  vote?: number;
  comment?: number;
  ago_number?: number;
  ago_string?: string;
  image?: string[];
  vote_status: VoteStatus;
}

type HomeScreen = StackNavigationProp<RootStackParamList, ROUTES.HOME>;
const HomeScreen : React.FC<{navigation: HomeScreen}> = ({navigation}) => {
  const ref = useRef(0)
  const rbRef = useRef<RBSheet>(null)
  const [apiData, setApiData] = useState<IQInfo[]>([])
  const [userAttribute, setAttribute] = useState<IUserAtt>({});
  const [userCommunity, setUserCommunity] = useState<IUserCommunityShortInfo[]>([])
  const userInfoStateChanged = useAppSelector(state => state.userInfoReducer.state)
  const [listPrevId, setListPrevId] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const setId = (id : number) =>{
    dispatch(click(id));
  }

  useEffect(()=>{
    API.UserCommunity(null)
       .then(res => res.json())
       .then(data => {
          if(JSON.stringify(data) !== JSON.stringify(userCommunity)){
            setUserCommunity(data)
          }
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
    API.FeedPosts(listPrevId).then(res => res.json())
            .then(data => {if(data.length){setApiData(data)}}).catch(e => (e as Error).message)
    },[ref.current]) 

  useEffect(()=>{
      if(apiData.length != 0){
          Array.from(apiData, child => {
              setListPrevId(prev => [...prev, child.question_id as number])
            })
      }
  },[apiData])

  const loadMoreData = async () =>{
      ref.current = ref.current + 1;
  }

  const communityPress = async (id?: number) => {
      dispatch(setCommunityId({community_id: id}))
  }
  const usernamePress = async (id?: number)=> {
      dispatch(setUserId({user_id: id}))
  }

  const upVotePress = (q_id: number)=> {
    API.QuestionUpVote(q_id).catch(e => (e as Error).message)
    apiData.forEach(e => {
        if(e.question_id == q_id){
            setApiData([...apiData.map((i)=> 
                i.question_id === e.question_id ? (i.vote_status === VoteStatus.NOT_VOTE ? {...i, vote: e.vote as number + 1, vote_status: VoteStatus.UP_VOTE} :
                                            i.vote_status === VoteStatus.UP_VOTE ? {...i, vote: e.vote as number - 1, vote_status: VoteStatus.NOT_VOTE} 
                                                                                 : {...i, vote: e.vote as number + 2, vote_status: VoteStatus.UP_VOTE})
                                         : i)])
          }
      })

  }

  const downVotePress = (q_id: number)=> {
      API.QuestionDownVote(q_id).catch(e => (e as Error).message)
      apiData.forEach(e => {
          if(e.question_id == q_id){
              setApiData([...apiData.map((i)=> 
                  i.question_id === e.question_id ? (i.vote_status === VoteStatus.NOT_VOTE ? {...i, vote: e.vote as number - 1, vote_status: VoteStatus.DOWN_VOTE} :
                                              i.vote_status === VoteStatus.UP_VOTE ? {...i, vote: e.vote as number - 2, vote_status: VoteStatus.DOWN_VOTE} 
                                                                                   : {...i, vote: e.vote as number + 1, vote_status: VoteStatus.NOT_VOTE})
                                          : i)])
          }
      })
  }

  const commentPress = () => {
      rbRef.current?.open()
  }
  const dotsPress = () => {}
  const onPress = () => {}

  const sharePress = () => {}

  return(     
    <View>
        <FlatList
            data={apiData}
            renderItem={({item} : {item: IQInfo}) =>         
                <QuestionCard 
                    ago_number={item.ago_number}
                    ago_string={item.ago_string}
                    author_name={item.author_name}
                    comment={item.comment}
                    commentPress={() => [commentPress]}
                    communityPress={()=> communityPress(item.community_id).then(()=> navigation.navigate(ROUTES.COMMUNITY))}
                    community_image={item.community_image}
                    community_name={item.community_name}
                    description={item.description}
                    dotsPress={dotsPress}
                    downVotePress={() => downVotePress(item.question_id as number)}
                    image={item.image}
                    onPress={onPress}
                    question={item.question}
                    sharePress={sharePress}
                    upVotePress={() => upVotePress(item.question_id as number)}
                    usernamePress={()=> usernamePress(item.author_id).then(()=> navigation.navigate(ROUTES.PROFILE))}
                    vote={item.vote}
                    vote_status={item.vote_status}/>}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
          <AnswerBottomSheet rbRef={rbRef} backPress={()=> rbRef.current?.close()}/>
    </View>
)
};

export default HomeScreen;