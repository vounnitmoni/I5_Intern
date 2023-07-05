import { Inline, Stack } from "@mobily/stacks"
import { Icon, Image, Text } from "@rneui/themed"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import CommentList from "./CommentList"
import { useEffect, useState } from "react";
import API from "../../api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setData } from "../../store/PostQuestionReducer";
import { Avatar } from "react-native-paper";
import { VoteStatus } from "../../enums/EVoteStatus";
import { FlatList } from "react-native-gesture-handler";
import { setBothCommentId } from "../../store/IdReducer";

interface commentResponse{
    comment_id?: number;
    author_id?: number;
    reply_to?: number;
    reply_to_username?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    name_shortcut?: string;
    comment?: string;
    ago_string?: string;
    ago_number?: number;
    author_photo?: string;
    comment_photo?: string;
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
    usernamePress?: () => void;
    upVotePress?: () => void;
    downVotePress?: () => void;
    userPress?: () => void;
    onReply?: () => void;
}
interface commentData{
    comment?: string;
    parent_id?: number;
    photo?: string;
}

const AnswerList: React.FC<IAnswerData> = ({
    ago_number,
    ago_string,
    answer,
    answer_id,
    answer_photo,
    author_id,
    author_photo,
    firstname,
    lastname,
    username,
    name_shortcut,
    vote,
    vote_status,
    usernamePress,
    downVotePress,
    upVotePress,
    userPress,
    onReply
}) => {
    const q_id = useAppSelector(state => state.IdReducer.question_id)
    const [upVote, setUpvote] = useState(false)
    const [downVote, setDownVote] = useState(false)
    const [visible, setVisible] = useState(false)
    const setVibility = () => setVisible(!visible)
    const [commentData, setCommentData] = useState<commentData>()
    const [commentResponses, setCommentResponses] = useState<commentResponse[]>([])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(vote_status === VoteStatus.UP_VOTE){
            setUpvote(true)
        }
        if(vote_status === VoteStatus.DOWN_VOTE){
            setDownVote(true)
        }  
    },[vote_status])

    const insideUpVotePress = () => {
        setUpvote(!upVote)
        setDownVote(false)
    }
    const insideDownVotePress = () => {
        setDownVote(!downVote)
        setUpvote(false)
    }
    useEffect(()=>{
        API.ListComment(answer_id as number, []).then(res => res.json()).then(data => setCommentResponses(data))
    },[])

    return(
        <Stack space={2} style={{backgroundColor: "#fff", padding:10, borderRadius: 5}}>
            <Inline space={3} alignX={"between"} alignY={'center'}>
                    <Inline space={2}>
                        <TouchableOpacity onPress={userPress}>
                            {author_photo ? (<Image source={{uri: `data:image/jpeg;base64,${author_photo}`}} style={styles.image}/>) 
                                             : (<Avatar.Text label={name_shortcut as string} size={35}/>)}
                        </TouchableOpacity>
                        <Stack>
                            <TouchableOpacity onPress={userPress}>
                                <Text style={{fontWeight: "700"}}>{firstname} {lastname}</Text>
                            </TouchableOpacity>
                            <Inline space={1}>
                                <TouchableOpacity onPress={usernamePress}>
                                    <Text>@{username}</Text>
                                </TouchableOpacity>
                                <Text>•</Text>
                                <Text>{ago_number}{ago_string}</Text>
                            </Inline>
                        </Stack>
                    </Inline>
                    <TouchableOpacity onPress={()=>null}>
                        <Icon name="dots-vertical" type="material-community"/>
                    </TouchableOpacity>
                </Inline>
                <Text>{answer}</Text>
                <View style={{width: '100%', height: 200}}>
                    <Image source={{uri: `data:image/jpeg;base64,${answer_photo}`}} style={{width: '50%', height: 200, marginLeft: '50%'}}/>
                </View>
                <Inline alignX={'between'} alignY={"center"}>
                        <Inline alignY={"center"} marginTop={1} marginBottom={1}>
                            <TouchableOpacity onPress={()=> [upVotePress, insideUpVotePress()]}>
                                {upVote === true ? (<Icon name="arrow-up-thin-circle-outline" type="material-community" color={'blue'}/>) 
                                                : (<Icon name="arrow-up-thin-circle-outline" type="material-community"/>)}
                            </TouchableOpacity>
                            <Text>  {vote}  </Text>
                            <TouchableOpacity onPress={()=>[downVotePress, insideDownVotePress()]}>
                                {downVote === true ? (<Icon name="arrow-down-thin-circle-outline" type="material-community" color={'blue'}/> ) 
                                                : (<Icon name="arrow-down-thin-circle-outline" type="material-community"/>)}     
                            </TouchableOpacity> 
                            <TouchableOpacity style={{paddingLeft: 30}} onPress={onReply}>
                                <Text>Reply</Text>
                            </TouchableOpacity>    
                        </Inline>
                    </Inline>
                {commentResponses.length != 0 ? (visible ? (commentResponses.map((item, index) =>{
                        return(
                            <CommentList
                                key={index} 
                                ago_number={item.ago_number}
                                ago_string={item.ago_string}
                                author_id={item.author_id}
                                author_photo={item.author_photo}
                                comment={item.comment}
                                comment_id={item.comment_id}
                                comment_photo={item.comment_photo}
                                firstname={item.firstname}
                                lastname={item.lastname}
                                name_shortcut={item.name_shortcut}
                                reply_to={item.reply_to}
                                reply_to_username={item.reply_to_username}
                                username={item.username}
                            />
                        )
                })) : <CommentList 
                                ago_number={commentResponses[0]?.ago_number}
                                ago_string={commentResponses[0]?.ago_string}
                                author_id={commentResponses[0]?.author_id}
                                author_photo={commentResponses[0]?.author_photo}
                                comment={commentResponses[0]?.comment}
                                comment_id={commentResponses[0]?.comment_id}
                                comment_photo={commentResponses[0]?.comment_photo}
                                firstname={commentResponses[0]?.firstname}
                                lastname={commentResponses[0]?.lastname}
                                name_shortcut={commentResponses[0]?.name_shortcut}
                                reply_to={commentResponses[0]?.reply_to}
                                reply_to_username={commentResponses[0]?.reply_to_username}
                                username={commentResponses[0]?.username}
                            />) 
                : null}
                {Array.from(commentResponses).map((item, index) => {
                    if(item.reply_to_username == null){
                        return(
                            <TouchableOpacity key={index} onPress={setVibility} style={{paddingLeft: 200}}>
                                {visible ? <Text style={{color: 'blue'}}>Close</Text> : <Text style={{color: 'blue'}}>Expand</Text>}
                            </TouchableOpacity>)
                    }
                })}

        </Stack>
    )
}
const styles = StyleSheet.create({
    image:{
        width: 40,
        height: 40,
        borderRadius: 40/2
    }
})
export default AnswerList