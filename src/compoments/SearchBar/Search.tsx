import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SearchBar, Text } from "@rneui/themed"
import { View, StyleSheet, StatusBar } from "react-native"
import { Searchbar } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import CommunitySearch from "./SearchBarComponents/Community";
import UserSearch from "./SearchBarComponents/User";
import QuestionSearch from "./SearchBarComponents/Question";
import { useState } from "react";

const TopTab = createMaterialTopTabNavigator();

const SearchScreen = () =>{
    const [searchParam, setSearchParam] = useState('')
    return(
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={text => setSearchParam(text)}
                    style={styles.search} 
                    value={searchParam}/>
            </View>
            <TopTab.Navigator>
                <TopTab.Group screenOptions={{
                    tabBarLabelStyle:{
                        fontWeight: '600'
                    }
                }}>
                    <TopTab.Screen name="Community">
                        {prop => <CommunitySearch {...prop} search={searchParam}/>}
                    </TopTab.Screen>
                    <TopTab.Screen name="Question">
                        {prop => <QuestionSearch {...prop} search={searchParam}/>}
                    </TopTab.Screen>
                    <TopTab.Screen name="User">
                        {prop => <UserSearch {...prop} search={searchParam}/>}
                    </TopTab.Screen>
                </TopTab.Group>
            </TopTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    searchBarContainer:{
        padding: 10,
        alignItems: "center",
        backgroundColor: '#EE5407'
    },
    search:{
        width: '98%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: StatusBar.currentHeight,
        elevation: 5,
    },
})
export default SearchScreen