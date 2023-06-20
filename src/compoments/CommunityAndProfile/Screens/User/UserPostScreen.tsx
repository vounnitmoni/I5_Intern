import { useState, useEffect, useRef } from "react"
import {FlatList, View} from "react-native"
import API from "../../../../api";
import { useAppSelector } from "../../../../store/hooks";
import QuestionCard from "../../Components/QuestionCard";
import { useDispatch } from "react-redux";
import { setCommunityId, setQuestionId, setUserId } from "../../../../store/IdReducer";
import { RootStackParamList } from "../../../Nagivation/TypeNavigation";
import { ROUTES } from "../../../../enums/RouteEnum";
import { StackNavigationProp } from "@react-navigation/stack";
import { VoteStatus } from "../../../../enums/EVoteStatus";
import { Text } from "@rneui/themed";
import AnswerQuestion from "../../../Answer/AnswerQuestion";
import { ITempData } from "../../../../interfaces/ITempData";

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
    vote_status?: VoteStatus;
}

interface IQTemp{
    comment?: number;
    vote?: number;
    q_id?: number;
}

type navigation = StackNavigationProp<RootStackParamList, ROUTES.USER_POST>
const UserPostScreen: React.FC<{navigation: navigation}> = ({navigation}) =>{
    const ref = useRef(0)
    const [apiData, setApiData] = useState<IQInfo[]>([])
    const [listPrevId, setListPrevId] = useState<number[]>([]);
    const [answerPopUp, setAnswerPopUp] = useState(false)
    const [questionTempData, setQuestionTempData] = useState<IQTemp[]>([]);
    const user_id = useAppSelector(state => state.IdReducer.user_id)
    const community_id = useAppSelector(state => state.IdReducer.community_id)
    const dispatch = useDispatch()

    useEffect(()=>{
        API.UserPosts(user_id, listPrevId).then(res => res.json())
           .then(data => {if(data.length){setApiData(data)}}).catch(e => (e as Error).message)
    },[ref.current])
    console.log(apiData) 

    useEffect(()=>{
        if(apiData.length != 0){
            Array.from(apiData, child => {
                setListPrevId(prev => [...prev, child.question_id as number])
              })
            Array.from(apiData, data => {
                setQuestionTempData(prev => [...prev, {comment: data.comment, q_id: data.question_id, vote: data.vote}])
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
        questionTempData.forEach(e => {
            if(e.q_id == q_id){
                setApiData([...apiData.map((i)=> 
                    i.question_id === e.q_id ? (i.vote_status === VoteStatus.NOT_VOTE ? {...i, vote: e.vote as number + 1, vote_status: VoteStatus.UP_VOTE} :
                                                i.vote_status === VoteStatus.UP_VOTE ? {...i, vote: e.vote as number - 1, vote_status: VoteStatus.NOT_VOTE} 
                                                                                     : {...i, vote: e.vote as number + 2, vote_status: VoteStatus.UP_VOTE})
                                             : i)])
            }
        })

    }

    const downVotePress = (q_id: number)=> {
        API.QuestionDownVote(q_id).catch(e => (e as Error).message)
        questionTempData.forEach(e => {
            if(e.q_id == q_id){
                setApiData([...apiData.map((i)=> 
                    i.question_id === e.q_id ? (i.vote_status === VoteStatus.NOT_VOTE ? {...i, vote: e.vote as number - 1, vote_status: VoteStatus.DOWN_VOTE} :
                                                i.vote_status === VoteStatus.UP_VOTE ? {...i, vote: e.vote as number - 2, vote_status: VoteStatus.DOWN_VOTE} 
                                                                                     : {...i, vote: e.vote as number + 1, vote_status: VoteStatus.NOT_VOTE})
                                             : i)])
            }
        })
    }

    const commentPress = async (id?: number) => {
        dispatch(setQuestionId({question_id: id}))
    }

    const dotsPress = () => {}
    const onPress = () => {}
    const sharePress = () => {}

    return(     
        <View>
            <FlatList
                style={{marginBottom: 310}} 
                data={apiData}
                renderItem={({item} : {item: IQInfo}) =>         
                    <QuestionCard 
                        ago_number={item.ago_number}
                        ago_string={item.ago_string}
                        author_name={item.author_name}
                        comment={item.comment}
                        commentPress={()=> commentPress(item.question_id).then(()=> setAnswerPopUp(true))}
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
            {answerPopUp && (<AnswerQuestion />)}
        </View>
    )
}
export default UserPostScreen