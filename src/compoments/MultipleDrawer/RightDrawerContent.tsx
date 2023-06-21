import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Image, Text } from "@rneui/themed"
import { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ROUTES } from "../../enums/RouteEnum"
import { Avatar, Modal, PaperProvider, Portal, Switch } from "react-native-paper"
import HomeScreen from "../../screens/Home"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useNavigation } from "@react-navigation/native"
import API from "../../api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { circularClick } from "../../store/onClickRecursiveReducer"
import { RootStackParamList } from "../Nagivation/TypeNavigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { IUserData } from "./utils"
import { communityListAttribute, removeCommunityListAttribute } from "../../store/userCommunityListReducer"
import { removeUserInfo } from "../../store/userInfoReducer"
import IdReducer, { removeAllId, setUserId } from "../../store/IdReducer"

const IRightDrawerMenu = [
    {
        name: ROUTES.HOME,
        label: 'Home',
        type: 'ionicon',
        icon: 'md-home-outline',
    },
    {
        name: ROUTES.PROFILE,
        label: 'Profile',
        type: 'ionicon',
        icon: 'md-person-outline',
    },
    {
        name: ROUTES.BOOKMARK,
        label: 'Bookmarks',
        type: 'ionicon',
        icon: 'bookmark-outline',
    },
    {
        name: ROUTES.SETTING,
        label: 'Settings',
        type: 'ionicon',
        icon: 'md-settings-outline',
    }
]

interface userAttribute {
    firstname?: string;
    lastname?: string;
    username?: string;
    follower?: number;
    followee?: number;
    name_shortcut?: string;
    profile_pic?: string;
}

const Switchs = () =>{
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
}

type RightDrawerScreen = StackNavigationProp<RootStackParamList, ROUTES.RIGHTDRAWER>;
const RightDrawerContent : React.FC<{navigation?: RightDrawerScreen}> = ({
    navigation,
}) =>{
    const {t} = useTranslation();
    const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.userInfoReducer.id)
    const userAtt : userAttribute = useAppSelector(state => state.userInfoReducer)
    const name_shortcut = useAppSelector(state => state.userInfoReducer.name_shortcut)
    const handleSignOut = () =>{  
        API.Logout(null).then((res)=>{
            if(res.status == 200){
                AsyncStorage.removeItem("token");
                dispatch(removeCommunityListAttribute())
                dispatch(removeUserInfo())
                dispatch(removeAllId())
            }
        }).then(()=> {
            if(action){
                dispatch(circularClick(false))
            }else{
                dispatch(circularClick(true))
            }  
        })
    }

    const getUserId = (name: string) =>{
        if(name === 'UserProfileScreen'){
            dispatch(setUserId({user_id: userId}))
        }
    }

    return(
        <Stack style={styles.container} space={5}>
            <Columns alignY={"bottom"} style={styles.profile}>
                <Column width={"2/5"}>
                    {userAtt.profile_pic ? (<Image source={{uri : `data:image/jpeg;base64,${userAtt.profile_pic}`}} style={{width: 80, height: 80, borderRadius: 40}}/>) 
                             : (<Avatar.Text size={80} label={name_shortcut as any}/>)}
                </Column>
                <Column width={"3/5"}>
                    <Stack space={2}>
                        <Text style={{fontSize: 17,fontWeight: '700'}}>{userAtt.firstname} {userAtt.lastname}</Text>
                        <Text>@{userAtt.username}</Text>
                    </Stack>
                </Column>
            </Columns>
            <Inline space={5}>
                <TouchableOpacity>
                    <Inline>
                        <Text style={{fontWeight: '700'}}>{userAtt.followee || 0}</Text>
                        <Text>  Following</Text>
                    </Inline>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Inline>
                        <Text style={{fontWeight: '700'}}>{userAtt.follower || 0}</Text>
                        <Text>  Follower</Text>
                    </Inline>
                </TouchableOpacity>
            </Inline>
            <Stack space={5}>
                {IRightDrawerMenu.map((item, index) =>{
                    return(
                        <TouchableOpacity key={index} onPress={()=> [navigation?.navigate(item.name as any), getUserId(item.name)]}>
                            <Inline space={10}>
                                <Icon name={item.icon} type={item.type}/>
                                <Text>{item.label}</Text>
                            </Inline>
                        </TouchableOpacity>
                    )
                })}
            </Stack>
            <View style={styles.line}/>
            <Text>Preference</Text>
            <Stack>
                <Inline alignX={'between'}>
                    <Text>Dark Theme</Text>
                    <Switchs />
                </Inline>
            </Stack>
            <Button
                title={t('common.logout')}
                icon={{
                name: 'log-out',
                type: 'feather',
                size: 22,
                color: 'white',
                }}
                size="lg"
                onPress={handleSignOut}
                style={styles.footer}
            />
            {/* {visible ? (
                <PaperProvider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                            <Text>Example Modal.  Click outside this area to dismiss.</Text>
                        </Modal>
                    </Portal>
                </PaperProvider>
            ): null} */}
        </Stack>    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 50,
        paddingLeft: 15,
        paddingRight: 15,
    }, 
    profile:{
        width:'100%',
    },
    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        opacity: 0.5
    },
    footer: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        alignSelf: 'center',
        position: 'absolute', //Here is the trick
    }
})
export default RightDrawerContent