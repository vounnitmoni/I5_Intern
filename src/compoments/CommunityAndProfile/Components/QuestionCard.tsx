import { Inline, Stack } from "@mobily/stacks"
import { Icon, Image, Text } from "@rneui/themed"
import React, { useEffect, useState } from "react"
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native"
import { VoteStatus } from "../../../enums/EVoteStatus";
import ImageSlide from "../../Post/ImageSlider";
import CommentList from "../../Answer/CommentList";

interface IQInfo{
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
    communityPress?: ()=> void;
    usernamePress?: ()=> void;
    upVotePress: ()=> void;
    downVotePress: ()=> void;
    commentPress?: ()=> void;
    sharePress?: ()=> void;
    dotsPress?: ()=> void;
    onPress?: ()=> void;
    style?: StyleProp<ViewStyle>;
    numberOfLine?: number;
}

const QuestionCard: React.FC<IQInfo> = ({
    ago_number,
    ago_string,
    community_image,
    author_name,
    comment,
    commentPress,
    communityPress,
    community_name,
    description,
    dotsPress,
    downVotePress,
    image,
    onPress,
    question,
    sharePress,
    upVotePress,
    usernamePress,
    vote,
    vote_status,
    style,
    numberOfLine,
}) => {
    const [upVote, setUpvote] = useState(false)
    const [downVote, setDownVote] = useState(false)

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

    return(
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Stack>
                <Inline space={3} alignX={"between"} alignY={'center'}>
                    <Inline space={2}>
                        <TouchableOpacity onPress={communityPress}>
                            {community_image ? (<Image source={{uri: `data:image/jpeg;base64,${community_image}`}} style={styles.image}/>) 
                                             : (<Image source={require('./../../../assets/images/community_blank_logo.png')} style={styles.image}/>)}
                        </TouchableOpacity>
                        <Stack>
                            <TouchableOpacity onPress={communityPress}>
                                <Text style={{fontWeight: "700"}}>{community_name}</Text>
                            </TouchableOpacity>
                            <Inline space={1}>
                                <TouchableOpacity onPress={usernamePress}>
                                    <Text>@{author_name}</Text>
                                </TouchableOpacity>
                                <Text>•</Text>
                                <Text>{ago_number}{ago_string}</Text>
                            </Inline>
                        </Stack>
                    </Inline>
                    <TouchableOpacity onPress={dotsPress}>
                        <Icon name="dots-vertical" type="material-community"/>
                    </TouchableOpacity>
                </Inline>
                <Text style={{fontSize: 15,fontWeight: "700"}}>{question}</Text>
                {image?.length != 0 ? (<View style={{marginTop: 2, marginBottom: 2}}>
                                <ImageSlide base64={image as string[]}/>
                          </View>) 
                       : (<Text  numberOfLines={numberOfLine != null ? numberOfLine : 2}>{description}</Text>)}
                <Inline alignX={'between'} alignY={"center"}>
                    <Inline alignY={"center"} marginTop={1} marginBottom={1}>
                        <TouchableOpacity onPress={()=> [upVotePress(), insideUpVotePress()]}>
                            {upVote === true ? (<Icon name="arrow-up-thin-circle-outline" type="material-community" color={'blue'}/>) 
                                             : (<Icon name="arrow-up-thin-circle-outline" type="material-community"/>)}
                        </TouchableOpacity>
                        <Text>  {vote}  </Text>
                        <TouchableOpacity onPress={()=>[downVotePress(), insideDownVotePress()]}>
                            {downVote === true ? (<Icon name="arrow-down-thin-circle-outline" type="material-community" color={'blue'}/> ) 
                                               : (<Icon name="arrow-down-thin-circle-outline" type="material-community"/>)}     
                        </TouchableOpacity> 
                        <Inline alignY={"center"}>
                                <TouchableOpacity onPress={commentPress}>
                                    <Icon style={{marginLeft: 30}} name="comment-outline" type="material-community"/>
                                </TouchableOpacity> 
                                <Text>  {comment}</Text>             
                        </Inline>   
                    </Inline>
                    <TouchableOpacity onPress={sharePress} style={{marginRight: 5}}>
                        <Icon name="share-social" type="ionicon"/>
                    </TouchableOpacity>
                </Inline>
            </Stack>    
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 5,
        margin: 5,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#fff'
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 40/2
    }
})

export default QuestionCard