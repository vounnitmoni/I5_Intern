import { Box, Inline, Stack } from "@mobily/stacks";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, CheckBox, Icon, Image, SearchBar, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native"
import API from "../../api";
import { RootStackParamList } from "../../compoments/Nagivation/TypeNavigation";
import { ROUTES } from "../../enums/RouteEnum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hasCommunity } from "../../store/onClickRecursiveReducer";
import { setData } from "../../store/PostQuestionReducer";
import userCommunityListReducer from "../../store/userCommunityListReducer";

interface ICommunityList{
    id: number,
    name: string,
    image: string,
}

type itemProps = {
    item: ICommunityList,
}

type navigation = StackNavigationProp<RootStackParamList, ROUTES.QUESTION>

const CommunityListScreen: React.FC<{navigation: navigation}> = ({navigation}) =>{
    const [community, setCommunity] = useState<ICommunityList[]>([]);
    const [name, setName] = useState('')
    const action = useAppSelector(state => state.PostQuestionReducer.community)
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    useEffect(()=>{
        API.UserCommunity({}).then(res => res.json())
        .then(async data => setCommunity(data))
        .catch(e => (e as Error).message);
    },[])
    // useEffect(()=>{
    //     Alert.alert("hello")
    // },[searchText && 10000])

    const renderCommunity = ({item} : itemProps) =>{
        const asyncFunction = async () =>{
            dispatch(setData({community : item.name}))
        }
        return(
                <TouchableOpacity onPress={()=> asyncFunction().then(()=> {
                        dispatch(hasCommunity(true))
                }).then(()=>{
                    navigation.goBack()
                })}>
                    <Inline space={5} style={{width: "100%", justifyContent: 'center'}}>
                        {item.image ? <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={{width: 50, height: 50, borderRadius: 50/2}} /> : <Image source={require('./../../assets/images/community_blank_logo.png')} style={{width: 50, height: 50, borderRadius: 50/2}} />}
                        <Stack>
                            <Text style={{fontSize: 20, fontWeight: '500'}}>{item.name} members</Text>
                            <Text>{item.id}</Text>
                        </Stack>
                    </Inline>
                </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <Stack space={3} style={styles.wrapper}>
                <Box alignX={"between"} direction={"row"} style={{alignItems: "center"}}>
                    <TouchableOpacity>
                        <Icon name="return-up-back-sharp" type="ionicon" onPress={()=> navigation.goBack()}/>
                    </TouchableOpacity>
                    <Button size="sm" buttonStyle={{borderRadius: 8, backgroundColor: '#3189e7'}} title={"Confirm"} onPress={()=> navigation.goBack()}/>
                </Box>
                <SearchBar  placeholder="Search" 
                            containerStyle={{backgroundColor : '#00000000', borderBottomColor: "#00000000", borderTopColor: "#00000000", padding: 0}} 
                            inputStyle={{backgroundColor: '#E0E0E0'}} 
                            inputContainerStyle={{backgroundColor: '#E0E0E0', width: '100%'}}
                            onChangeText={(text)=> setSearchText(text)}
                            value={searchText}/>
                </Stack>
                <Stack space={3} style={[styles.wrapper]}>
                    <FlatList 
                        data = {community}
                        renderItem = {(e)=> <View style={{paddingBottom: 10}}>
                            {renderCommunity(e)}
                        </View>}
                    />
                </Stack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    },
    wrapper: {
        padding: 12,
    }
})

export default CommunityListScreen;