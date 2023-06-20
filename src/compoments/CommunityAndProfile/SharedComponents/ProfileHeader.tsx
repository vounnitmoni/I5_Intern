import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Image, Text } from "@rneui/themed"
import { useEffect, useRef, useState } from "react"
import { TouchableOpacity, View, StyleSheet} from "react-native"
import API from "../../../api"
import { useAppSelector } from "../../../store/hooks"
import { ScrollView } from "react-native-gesture-handler"
import { IUserAtt } from "../../../interfaces/IAPI"
import { Avatar } from "react-native-paper"
import { ITempData } from "../../../interfaces/ITempData"

enum Identifier{
    APP_USER,
    USER,
}

const UserProfileHeader = () =>{
    const ref = useRef(0)
    const [numberOfLine, setNumberOfLine] = useState(2)
    const [numberLinePress, setNumberLinePress] = useState(false)
    const [followAmount, setFollowAmount] = useState<ITempData>();
    const onPressNumberOfLine = () => setNumberLinePress(!numberLinePress)
    const [identifier, setIdentifier] = useState<Identifier>()
    const userId = useAppSelector(state => state.IdReducer.user_id)
    const _userId_ = useAppSelector(state => state.userInfoReducer.id)
    const [userInfo, setUserInfo] = useState<IUserAtt>()
    const [bellPress, setBellPress] = useState<boolean>()
    const [followPress, setFollowPress] = useState<boolean>()
    const userInfoReducer: IUserAtt = useAppSelector(state => state.userInfoReducer)
    const onPressFollow = () => setFollowPress(!followPress)
    const onPressBell = () => setBellPress(!bellPress);
    const name_shortcut = userInfo?.name_shortcut

    useEffect(()=>{
        setBellPress(userInfo?.is_notified)
        setFollowPress(userInfo?.is_followed)
    },[userInfo])

    useEffect(()=>{
        if(userId === _userId_){
            setUserInfo(userInfoReducer)
            setIdentifier(Identifier.APP_USER)
            setFollowAmount({followee: userInfo?.followee, follower: userInfo?.follower})
        }else{
            API.OtherUserShortInfo(userId).then(res => res.json())
               .then(data => setUserInfo(data))
            setIdentifier(Identifier.USER)
            setFollowAmount({followee: userInfo?.followee, follower: userInfo?.follower})
        }
    },[_userId_, userId, bellPress])

    useEffect(()=>{
        if(numberLinePress){
            setNumberOfLine(0)
        }else{
            setNumberOfLine(2)
        }
    },[numberLinePress])

    const followUser = () =>{
        API.FollowUser(userId).catch(e => (e as Error).message)
        setFollowAmount(prev => ({...prev, follower: (followAmount?.follower as number) + 1}))
    }
    const unfollowUser = () =>{
        API.UnfollowUser(userId).catch(e => (e as Error).message)
        setFollowAmount(prev => ({...prev, follower: (followAmount?.follower as number) - 1}))
    }
    return(
       <ScrollView>
             <Stack style={{backgroundColor: '#fff'}} space={1}>
                <Image source={{uri: `data:image/jpeg;base64,${userInfo?.cover_pic}`}} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <Columns paddingLeft={6} paddingRight={6} paddingTop={5} alignY={"center"}>
                        <Column>
                            {userInfo?.profile_pic ? (<Image source={{uri: `data:image/jpeg;base64,${userInfo?.profile_pic}`}} style={{height: 80, width: 80, borderRadius: 40}}/>) 
                                                   : (<Avatar.Text label={name_shortcut as any}  style={{height: 80, width: 80, borderRadius: 40}}/>)}
                        </Column>
                    </Columns>
                </Image>
                <Stack paddingLeft={6} paddingRight={6}>
                    <Inline alignX={'between'} alignY={'center'}>
                        <Stack>
                            <Text style={{fontWeight:"700", fontSize:23}}>{userInfo?.firstname} {userInfo?.lastname}</Text>
                            <Inline space={3}>
                                <Text>{followAmount?.follower} Follower</Text>
                                <Text>{followAmount?.followee} Following</Text>
                            </Inline>
                        </Stack>
                        <Inline space={4} alignX={"right"} alignY={"center"}>
                            {identifier === Identifier.USER && (
                                <Inline alignY={'center'}>
                                    {followPress  ? (
                                                    <TouchableOpacity style={styles.icon} onPress={()=> [onPressFollow(), unfollowUser()]}>
                                                        <Icon name="user-following" type="simple-line-icon" color={'blue'}/>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity style={styles.icon} onPress={()=> [onPressFollow(), followUser()]}>
                                                        <Icon name="user-follow" type="simple-line-icon"/>
                                                    </TouchableOpacity>
                                                )}
                                    {bellPress ? (<TouchableOpacity style={styles.icon} onPress={()=> onPressBell()}>
                                                <Icon name="bell-ring" type="material-community" color={'blue'}/>
                                            </TouchableOpacity>) 
                                                            : (<TouchableOpacity style={styles.icon} onPress={()=> onPressBell}>
                                                                    <Icon name="bell-outline" type="material-community"/>
                                                                </TouchableOpacity>)}
                                    <TouchableOpacity style={styles.icon}>
                                        <Icon name="chatbox-ellipses-outline" type="ionicon"/>
                                    </TouchableOpacity>
                                </Inline>
                            )}
                            {identifier === Identifier.APP_USER && (
                                <Inline space={3}>
                                    <TouchableOpacity>
                                        <Icon name="account-edit-outline" type="material-community"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="md-settings-outline" type="ionicon"/>
                                    </TouchableOpacity>
                                </Inline>
                            )}
                        </Inline>
                    </Inline>
                    {userInfo?.bio  ?  <TouchableOpacity onPress={() => onPressNumberOfLine()}>
                                                <Text ellipsizeMode="tail"
                                                    numberOfLines={numberOfLine}>
                                                        {userInfo?.bio}
                                                </Text>
                                            </TouchableOpacity> 
                                    : null}
                </Stack>
            </Stack>
       </ScrollView>
    )
}
const styles = StyleSheet.create({
    icon:{
        paddingRight: 5, 
        paddingLeft: 5
    }
})
export default UserProfileHeader
