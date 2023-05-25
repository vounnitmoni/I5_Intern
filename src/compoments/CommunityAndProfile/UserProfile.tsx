import { Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import Header from "./SharedComponents/Header"
import { View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import PostScreen from "./Screens/Community/PostScreen"
import AboutScreen from "./Screens/Community/AboutScreen"
import UserPostScreen from "./Screens/User/UserPostScreen"
import UserAnswerScreen from "./Screens/User/UserAnswerScreen"
import UserAboutScreen from "./Screens/User/UserAboutScreen"

const TopTab = createMaterialTopTabNavigator();

const UserProfileScreen = () =>{
    return(
        <Stack>
            <Header/>
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
        </Stack>
    )
}

export default UserProfileScreen;