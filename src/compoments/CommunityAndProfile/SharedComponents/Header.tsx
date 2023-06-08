import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Button, Icon, Image, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import API from "../../../api"
import { EISA } from "../../../enums/EISA"
import { useAppSelector } from "../../../store/hooks"
import { ScrollView } from "react-native-gesture-handler"

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
    const [bellPress, setBellPress] = useState<boolean>()
    const [joinPress, setJoinPress] = useState<boolean>()
    const onPressJoin = () => setJoinPress(!joinPress)
    const onPressBell = () => setBellPress(!bellPress);

    useEffect(()=>{
        API.CommunityInfo(communityId)
           .then(res => res.json())
           .then(data => setCommunityInfo(data))
    },[ref.current, bellPress, joinPress])

    useEffect(()=>{
        setBellPress(communityInfo?.is_notified)
        setJoinPress(communityInfo?.is_joined)
    },[communityInfo])

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
       <ScrollView>
             <Stack style={{backgroundColor: '#fff'}} space={1}>
                <Image source={{uri: `data:image/jpeg;base64,${communityInfo?.cover_pic}`}} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <Columns paddingLeft={6} paddingRight={6} paddingTop={5} alignY={"center"}>
                        <Column>
                            {communityInfo?.profile_pic ? (<Image source={{uri: `data:image/jpeg;base64,${communityInfo?.profile_pic}`}} style={{height: 80, width: 80, borderRadius: 40}}/>) 
                                                        : (<Image source={require('./../../../assets/images/community_blank_logo.png')} style={{height: 80, width: 80, borderRadius: 40}}/>)}
                        </Column>
                    </Columns>
                </Image>
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
                                                onPress={()=> [onPressJoin(), joinCommunity()]}/>)}
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
       </ScrollView>
    )
}

export default Header