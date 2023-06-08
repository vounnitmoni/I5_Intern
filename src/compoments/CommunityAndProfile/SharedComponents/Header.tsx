import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Button, Icon, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import API from "../../../api"
import { EISA } from "../../../enums/EISA"
import { useAppSelector } from "../../../store/hooks"

interface ICommunityInfo{
    id: number,
    name: string,
    members: number,
    bio: string,
    profile_pic: string,
    cover_pic: string,
    is_joined: boolean,
    is_notified: boolean,
    isa: EISA,
}

const Header = () =>{
    const ref = useRef(0)
    const [numberOfLine, setNumberOfLine] = useState(2)
    const [numberLinePress, setNumberLinePress] = useState(false)
    const onPressNumberOfLine = () => setNumberLinePress(!numberLinePress)
    const communityId = useAppSelector(state => state.IdReducer.community_id)
    const [communityInfo, setCommunityInfo] = useState<ICommunityInfo>()
    const [bellPress, setBellPress] = useState(communityInfo?.is_notified)
    const [joinPress, setJoinPress] = useState(communityInfo?.is_joined)
    const onPressJoin = () => setJoinPress(!joinPress)
    const onPressBell = () => setBellPress(!bellPress);

    useEffect(()=>{
        API.CommunityInfo(communityId)
           .then(res => res.json())
           .then(data => setCommunityInfo(data))
    },[ref.current, bellPress, joinPress])

    useEffect(()=>{
        if(numberLinePress){
            setNumberOfLine(0)
        }else{
            setNumberOfLine(2)
        }
    },[numberLinePress])

    const joinCommunity = () =>{
        API.JoinCommunity(communityId)
           .catch(e => (e as Error).message)
    }
    const notJoinCommunity = () =>{
        API.NotJoinCommunity(communityId).catch(e => (e as Error).message)
    }

    return(
        <Stack style={{backgroundColor: '#fff'}} space={1}>
            <View style={{backgroundColor: 'blue'}}>
                <Columns paddingLeft={6} paddingRight={6} paddingTop={5} alignY={"center"}>
                    <Column>
                        <View style={{height: 80, width: 80, borderRadius: 40, backgroundColor: 'red'}}></View>
                    </Column>
                </Columns>
            </View>
            <Stack paddingLeft={6} paddingRight={6}>
                <Inline alignX={'between'} alignY={'center'}>
                    <Stack>
                        <Text style={{fontWeight:"700", fontSize:23}}>{communityInfo?.name}</Text>
                        <Text>{communityInfo?.members}  Members</Text>
                    </Stack>
                    <Inline space={4} alignX={"right"} alignY={"center"}>
                        {bellPress ? (<TouchableOpacity onPress={()=> onPressBell()}>
                                         <Icon name="bell-ring" type="material-community" color={'blue'}/>
                                      </TouchableOpacity>) 
                                                    : (<TouchableOpacity onPress={()=> onPressBell}>
                                                            <Icon name="bell-outline" type="material-community"/>
                                                        </TouchableOpacity>)
                                                    }
                        {joinPress  ?  (<Button
                                            title={'Joining'}
                                            size="sm"
                                            titleStyle={{color: 'black'}}
                                            color={"#DBDCEC"}
                                            onPress={()=> [onPressJoin(), notJoinCommunity()]}/>) 
                                    : (<Button
                                            title={'Join'}
                                            size="sm"
                                            buttonStyle={{width: 71.5}}
                                            onPress={()=> [onPressJoin(), joinCommunity]}/>)}
                    </Inline>
                </Inline>
                {communityInfo?.bio ? <TouchableOpacity onPress={() => onPressNumberOfLine()}>
                                            <Text ellipsizeMode="tail"
                                                numberOfLines={numberOfLine}>
                                                    {communityInfo?.bio}
                                            </Text>
                                        </TouchableOpacity> 
                                    : null}
            </Stack>
        </Stack>
    )
}

export default Header