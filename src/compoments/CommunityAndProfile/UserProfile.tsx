import { Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import Header from "./SharedComponents/Header"
import { StyleSheet, View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import PostScreen from "./Screens/Community/CommunityPostScreen"
import AboutScreen from "./Screens/Community/AboutScreen"
import UserPostScreen from "./Screens/User/UserPostScreen"
import UserAnswerScreen from "./Screens/User/UserAnswerScreen"
import UserAboutScreen from "./Screens/User/UserAboutScreen"
import UserProfileHeader from "./SharedComponents/ProfileHeader"
import FollowModal from "../Modals/FollowModal"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import followReducer, { EFollowPressStatus, followStatusClick } from "../../store/followReducer"

const TopTab = createMaterialTopTabNavigator();

interface IFollowClick{
    follow_status?: EFollowPressStatus,
    toggle?: boolean,
}

const UserProfileScreen = () =>{
    const [toggle, setToggle] = useState(false);
    const toggleSelector : IFollowClick = useAppSelector(state => ({follow_status: state.followReducer.follow_status, toggle: state.followReducer.toggle}))
    const dispatch = useAppDispatch()
    const toggleModal = (arg: boolean) =>{
        dispatch(followStatusClick({follow_status: undefined, toggle: false}))
    }
    
    return(
        <Stack>
            <UserProfileHeader />
            <View style={{height: '100%'}}>
                <TopTab.Navigator>
                    <TopTab.Group screenOptions={{
                        tabBarLabelStyle:{
                            fontWeight: '600'
                        }
                    }}>
                    <TopTab.Screen name="Post" component={UserPostScreen}/>
                    <TopTab.Screen name="Answer" component={UserAnswerScreen}/>
                    <TopTab.Screen name="About" component={UserAboutScreen}/>
                    </TopTab.Group>
                </TopTab.Navigator>
            </View>
            <FollowModal ModalVisible={toggleModal} isVisible={toggleSelector.toggle as boolean}/>
        </Stack>
    )
}
export default UserProfileScreen;