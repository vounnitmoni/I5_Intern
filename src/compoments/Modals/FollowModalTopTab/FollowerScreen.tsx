import { Column, Columns, Inline, Stack } from "@mobily/stacks";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Image, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar} from "react-native-paper";
import API from "../../../api";
import { ROUTES } from "../../../enums/RouteEnum";
import { useAppDispatch } from "../../../store/hooks";
import { setUserId } from "../../../store/IdReducer";

interface IUserInfo{
    id?: number;
    other_user_id?: number;
    each_user_id?: number;
    follow_id?: number;
    photo?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    name_shortcut?: string;
    is_followed?: boolean;
}

const FollowerUserInfoCard: React.FC<IUserInfo> = ({
    id,
    other_user_id,
    each_user_id,
    follow_id,
    photo,
    firstname,
    lastname,
    username,
    is_followed,
    name_shortcut,
}) =>{
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [tempIsFollowed, setTempIsFollowed] = useState<boolean>()
    const ref = useRef(0)

    useEffect(()=>{
        setTempIsFollowed(is_followed)
    },[])

    const followUser = () =>{
        setTempIsFollowed(true)
        API.FollowUser(each_user_id).catch(e => (e as Error).message)
    }
    
    const unFollowUser = () =>{
        setTempIsFollowed(false)
        API.UnfollowUser(each_user_id).catch(e => (e as Error).message)
    }
    return(
        <TouchableOpacity onPress={()=> [dispatch(setUserId({user_id: other_user_id})), navigation.dispatch(StackActions.push(ROUTES.PROFILE))]}>
            <Inline alignX={'between'}>
                <Columns>
                    {photo ? <Image source={{uri : `data:image/jpeg;base64,${photo}`}} style={{width: 40, height: 40, borderRadius: 20}}/> : <Avatar.Text label={name_shortcut as string} size={40}/>}
                    <Column >
                        <Stack>
                            <Text style={{color: 'black', fontWeight: '700'}}>{firstname} {lastname}</Text>
                            <Text style={{color: 'black'}}>@{username}</Text>
                        </Stack>
                    </Column>
                </Columns>
                {tempIsFollowed  ?  (<Button
                                        title={'Following'}
                                        size="sm"
                                        titleStyle={{color: 'black'}}
                                        color={"#DBDCEC"}
                                        onPress={()=> followUser}/>) 
                                : (<Button
                                        title={'Follow'}
                                        size="sm"
                                        buttonStyle={{width: 71.5}}
                                        onPress={()=> unFollowUser()}/>)}
            </Inline>           
        </TouchableOpacity>
    )
}

export default FollowerUserInfoCard