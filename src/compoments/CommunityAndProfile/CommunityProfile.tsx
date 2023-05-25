import { Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import Header from "./SharedComponents/Header"
import { View } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import PostScreen from "./Screens/Community/PostScreen"
import AboutScreen from "./Screens/Community/AboutScreen"

const TopTab = createMaterialTopTabNavigator();

const CommunityScreen = () =>{
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
                    <TopTab.Screen name="Post" component={PostScreen}/>
                    <TopTab.Screen name="About" component={AboutScreen}/>
                    </TopTab.Group>
                </TopTab.Navigator>
            </View>
        </Stack>
    )
}

export default CommunityScreen