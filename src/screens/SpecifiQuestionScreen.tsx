import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Image, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react"
import { StyleSheet, StatusBar, TextInput, View, TouchableOpacity, FlatList, Dimensions, LogBox} from "react-native"
import { Avatar } from "react-native-paper"
import QuestionCard from "../compoments/CommunityAndProfile/Components/QuestionCard"
import API from "../api"
import { useAppSelector } from "../store/hooks"
import { VoteStatus } from "../enums/EVoteStatus"
import { setAnswerId, setBothCommentId, setCommentId, setCommunityId, setParentCommentId, setQuestionId, setUserId } from "../store/IdReducer"
import { useDispatch } from "react-redux"
import RBSheet from "react-native-raw-bottom-sheet"
import { ScrollView } from "react-native-gesture-handler"
import AnswerList from "../compoments/Answer/AnswerList"
import AnswerBottomSheet from "../compoments/BottomSheet/AnswerBottomSheet"
import CommentBottomSheet from "../compoments/BottomSheet/CommentBottomSheet"

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

interface IAnswerData{
    answer_id?: number;
    author_id?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    answer?: string;
    ago_string?: string;
    ago_number?: number;
    author_photo?: string;
    answer_photo?: string;
    name_shortcut?: string
    vote?: number;
    vote_status?: VoteStatus;
}

interface IQTemp{
    comment?: number;
    vote?: number;
    q_id?: number;
}


const SpecificQuestionScreen = () =>{
    const [answerList, setAnswerList] = useState<IAnswerData[]>([])
    const [data, setData] = useState<IQInfo>()
    const q_id = useAppSelector(state => state.IdReducer.question_id)
    const ref = useRef(0)
    const rbRef = useRef<RBSheet>(null) 
    const crbRef = useRef<RBSheet>(null)
    const name_shortcut = useAppSelector(state => state.userInfoReducer.name_shortcut)
    const user_pic = useAppSelector(state => state.userInfoReducer.profile_pic)
    const dispatch = useDispatch()

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
        if(data?.vote_status === VoteStatus.NOT_VOTE) setData(prev => ({...prev, vote: data.vote as number + 1, vote_status: VoteStatus.UP_VOTE}))
        if(data?.vote_status === VoteStatus.DOWN_VOTE) setData(prev => ({...prev, vote: data.vote as number + 2, vote_status: VoteStatus.UP_VOTE}))
        if(data?.vote_status === VoteStatus.UP_VOTE) setData(prev => ({...prev, vote: data.vote as number - 1, vote_status: VoteStatus.NOT_VOTE}))
    }

    const downVotePress = (q_id: number)=> {
        API.QuestionDownVote(q_id).catch(e => (e as Error).message)
        if(data?.vote_status === VoteStatus.NOT_VOTE) setData(prev => ({...prev, vote: data.vote as number - 1, vote_status: VoteStatus.DOWN_VOTE}))
        if(data?.vote_status === VoteStatus.DOWN_VOTE) setData(prev => ({...prev, vote: data.vote as number + 1, vote_status: VoteStatus.NOT_VOTE}))
        if(data?.vote_status === VoteStatus.UP_VOTE) setData(prev => ({...prev, vote: data.vote as number - 2, vote_status: VoteStatus.DOWN_VOTE}))
    }

    const commentPress = async (id?: number) => {
        dispatch(setQuestionId({question_id: id}))
    }

    const dotsPress = () => {}

    const onPress = async (id: number) => {
        dispatch(setQuestionId({question_id: id}))
    }
    const sharePress = () => {}

    useEffect(()=>{
        API.QuestionById(q_id as number).then((res) => res.json()).then(data => setData(data))
            .catch(e => (e as Error).message)
    },[])

    useEffect(()=> {
        API.ListAnswer(q_id as number).then(res => res.json()).then(data => setAnswerList(data))
            .catch(e => (e as Error).message)
    },[])

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return(
        <ScrollView style={{backgroundColor: '#dee3e8', flex: 1}}>
            <Stack style={styles.container} space={2}>
            <QuestionCard 
                downVotePress={() => downVotePress(data?.question_id as number)}
                upVotePress={()=> upVotePress(data?.question_id as number)}
                ago_number={data?.ago_number}
                ago_string={data?.ago_string}
                author_name={data?.author_name}
                comment={data?.comment}
                commentPress={() => commentPress(data?.question_id as number)}
                communityPress={() => communityPress(data?.community_id as number)}
                community_image={data?.community_image}
                community_name={data?.community_name}
                description={data?.description}
                dotsPress={()=> dotsPress()}
                image={data?.image}
                question={data?.question}
                sharePress={() => sharePress()}
                usernamePress={()=> usernamePress(data?.author_id)}
                vote={data?.vote}
                vote_status={data?.vote_status}
                style={{margin: -1}}
                numberOfLine={0}
            />
                <Inline style={{width: '100%'}} alignY={"center"} alignX={"between"}>
                    {user_pic ? <Image source={{uri : `data:image/jpeg;base64,${user_pic}`}} style={{width: 35, height: 35, borderRadius: 35/2}}/> : <Avatar.Text label={name_shortcut as string} size={35}/>}
                    <TouchableOpacity onPress={() => rbRef.current?.open()}>
                        <TextInput multiline 
                                    placeholder={"Add an answer..."}
                                    style={{color: "black", fontSize: 15, backgroundColor: "#fff", borderRadius: 30, width: 350, paddingLeft: 15}}
                                    placeholderTextColor={"#8996a1"}
                                    editable={false}
                                    selectTextOnFocus={false}/>
                    </TouchableOpacity>
                </Inline>
                <FlatList  
                        data={answerList}
                        renderItem={({item} : {item: IAnswerData})=>
                            <AnswerList 
                                ago_number={item.ago_number}
                                ago_string={item.ago_string}
                                answer={item.answer}
                                answer_id={item.answer_id}
                                answer_photo={item.answer_photo}
                                author_id={item.author_id}
                                author_photo={item.answer_photo}
                                firstname={item.firstname}
                                lastname={item.lastname}
                                name_shortcut={item.name_shortcut}
                                username={item.username}
                                vote={item.vote}
                                vote_status={item.vote_status}
                                onReply={() => [dispatch(setAnswerId({answer_id: item.answer_id})), crbRef.current?.open(), dispatch(setParentCommentId({comment_parent: null}))]}
                            />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={loadMoreData}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}      
                    />
                </Stack>
                <CommentBottomSheet rbRef={crbRef} backPress={()=> crbRef.current?.close}/>
                <AnswerBottomSheet rbRef={rbRef} backPress={()=> rbRef.current?.close()}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight,
        padding: 10,
    }
})

export default SpecificQuestionScreen




// .then(()=> {
//     if(action == true){
//         dispatch(circularClick(false));
//     }else{
//         dispatch(circularClick(true));
//     }
// })\




//  return AsyncStorage.getItem('somekey')
// .then(req => JSON.parse(req))
// .then(json => console.log(json))
// .catch(error => console.log('error!'));

// const someArray = [1,2,3,4];
// return AsyncStorage.setItem('somekey', JSON.stringify(someArray))
// .then(json => console.log('success!'))
// .catch(error => console.log('error!'));