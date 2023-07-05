import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Icon, Image, Text } from "@rneui/themed"
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-paper"
import CommentBottomSheet from "../BottomSheet/CommentBottomSheet";
import RBSheet from "react-native-raw-bottom-sheet";

interface commentListData{
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
    userPress?: () => void;
    replyPress?: () => void;
}

const CommentList: React.FC<commentListData> = ({
    ago_number,
    ago_string,
    author_id,
    author_photo,
    comment,
    comment_id,
    comment_photo,
    firstname,
    lastname,
    name_shortcut,
    replyPress,
    reply_to,
    userPress,
    username,
    reply_to_username
}) =>{
    const [commentId, setCommentId] = useState<{id: number, parent_id: number}>()
    const rbRef = useRef<RBSheet>(null)
    replyPress = () =>{
        rbRef.current?.open()
    }
    return(
        <Stack style={styles.container}>
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
                                <TouchableOpacity onPress={userPress}>
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
                <Text style={{marginLeft: 44, paddingBottom: 5, paddingRight: 44}}>{comment}</Text>
                <View style={{width: '100%', height: 200}}>
                    <Image source={{uri: `data:image/jpeg;base64,${comment_photo}`}} style={{width: '41%', height: 200, marginLeft: '39%'}}/>
                </View>                       
                <Columns>
                    <Column width={'2/5'} style={{paddingLeft: 30}}>
                        <TouchableOpacity onPress={replyPress}>
                            <Text>    Reply</Text>
                        </TouchableOpacity>
                    </Column>
                    {reply_to_username && <TouchableOpacity>
                        <Text>Reply to: @{reply_to_username}</Text>
                    </TouchableOpacity>}
                </Columns>
                <CommentBottomSheet rbRef={rbRef} backPress={()=> rbRef.current?.close()}/>   
        </Stack>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 41
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 40/2
    }
})

export default CommentList