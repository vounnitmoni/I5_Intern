import { Column, Columns, Stack } from "@mobily/stacks"
import { Icon, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import API from "../../../api"
import { EFollowPressStatus, followStatusClick } from "../../../store/followReducer"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import FollowerUserInfoCard from "./FollowerScreen"

interface IUserInfo{
    id?: number;
    other_user_id?: number;
    each_user_id?:number;
    follow_id?: number;
    photo?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    name_shortcut?: string;
    is_followed?: boolean;
}

interface follow {
    follow_status?: EFollowPressStatus
    toggle?: boolean
}

const FollowingScreen = () =>{
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IUserInfo[]>([])
    const selector: follow = useAppSelector(state => state.followReducer)
    const [prev_id, setPrev_id] = useState<number[]>([])
    const profile_id = useAppSelector(state => state.IdReducer.user_id)
    const ref = useRef(0)

    useEffect(()=>{
        if(selector.follow_status === EFollowPressStatus.FOLLOWEE){
            API.ListFollowing(profile_id as number, prev_id).then(res=> res.json())
                .then(data => setData(data))
        }   
        if(selector.follow_status === EFollowPressStatus.FOLLOWER){
            API.ListFollower(profile_id as number, prev_id).then(res=> res.json())
                .then(data => setData(data))
        }
    },[])

    const loadMoreData = () =>{
        Array.from(data).forEach(e =>{
            setPrev_id(prev => [...prev, e.follow_id as number])
        })
        ref.current = ref.current + 1;
    }
    return(
        <Stack>
            <Columns alignY={'center'}>
                <Column width={'4/5'}>
                    {selector.follow_status === EFollowPressStatus.FOLLOWEE && <Text style={styles.header}>Following</Text>}
                    {selector.follow_status === EFollowPressStatus.FOLLOWER && <Text style={styles.header}>Follower</Text>}
                </Column>
                <TouchableOpacity onPress={()=> dispatch(followStatusClick({follow_status: undefined, toggle: false}))}>
                    <Icon style={{paddingLeft: 35}} size={30} name="close-outline" type="ionicon"/>
                </TouchableOpacity>
            </Columns>
            <View style={styles.line}/>
            <FlatList
                style={{padding: 5}} 
                data={data}
                renderItem={({item} : {item: IUserInfo})=>
                    <FollowerUserInfoCard firstname={item.firstname}
                                          is_followed={item.is_followed}
                                          lastname={item.lastname}
                                          name_shortcut={item.name_shortcut}
                                          photo={item.photo}
                                          username={item.username}
                                          id={item.id}
                                          other_user_id={item.other_user_id}
                                          each_user_id={item.each_user_id}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </Stack>
    )
}

const styles = StyleSheet.create({
    header:{
        color: 'black',
        fontWeight: '700',
        fontSize: 25,
    },
    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        opacity: 0.5
    }, 
})

export default FollowingScreen