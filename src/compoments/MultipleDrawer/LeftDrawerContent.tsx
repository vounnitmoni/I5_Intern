import { Inline, Stack } from "@mobily/stacks"
import { useNavigation } from "@react-navigation/native";
import { Icon, Image, Text } from "@rneui/themed"
import { Key, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ROUTES } from "../../enums/RouteEnum";
import { RootStackParamList } from "../Nagivation/TypeNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCommunityId } from "../../store/IdReducer";

interface ICData {
    id?: number;
    name?: string;
    image?: string;
}
type navigation = StackNavigationProp<RootStackParamList, ROUTES.NAVIGATOR>
const LeftDrawerContent: React.FC<{navigation?: navigation}> = ({
    navigation,
}) =>{
    const [recentlyCommunityData, setRecentlyCommunityData] = useState<ICData[]>([]);
    const yourCommunityData : ICData[] = useAppSelector(state => state.userCommunityListReducer)
    const [youOwnerCommunity, setYouOwnerCommunity] = useState<ICData[]>([])
    const dispatch = useAppDispatch();

    return( 
        <Stack space={4} style={styles.container}>
            <Inline alignX={"between"}>
                <Text style={{fontWeight: '700'}}>Recently Visited</Text>
                <TouchableOpacity>
                    <Text>See all</Text>
                </TouchableOpacity>
            </Inline>
            {recentlyCommunityData ? (
                <Stack space={4}>
                    {recentlyCommunityData.map((item: ICData, index: number)=>{
                        return(
                            <Inline key={index} space={6} alignY={"center"}>
                                <Image source={require('./../../assets/images/test-community-logo.png')} style={{width: 30, height: 30, borderRadius: 15}}/>
                                <Text>{item.name}</Text>
                            </Inline>
                        )
                    })}
                </Stack> 
            ): null}
            <View style={styles.line}/>
            <Text style={{fontWeight: '700'}}>Your Communities</Text>
            <TouchableOpacity onPress={()=> navigation?.navigate(ROUTES.CREATE_COMMUNITY)}>
                <Inline space={3} alignY={'center'}>
                    <Icon size={27} name="plus" type="antdesign"/>
                    <Text>Create a community</Text>
                </Inline>
            </TouchableOpacity>
            <View style={styles.line}/>
            {yourCommunityData ? (
                <Stack space={4}>
                    {yourCommunityData.map((item: ICData, index: number)=>{
                        return(
                            <TouchableOpacity onPress={()=> [navigation?.navigate(ROUTES.COMMUNITY), dispatch(setCommunityId({community_id: item.id}))]} key={index}>
                                <Inline space={3} alignY={"center"}>
                                    {item.image ? (<Image source={{uri : `data:image/jpeg;base64,${item.image}`}} style={{width: 30, height: 30, borderRadius: 15}}/>) 
                                                                   : (<Image source={require('./../../assets/images/community_blank_logo.png')} style={{width: 30, height: 30, borderRadius: 15}}/>)}
                                    <View style={{width: 200}}><Text ellipsizeMode="tail" numberOfLines={1}>{item.name}</Text></View>
                                </Inline>
                            </TouchableOpacity>
                        )
                    })}
                </Stack> 
            ): null}
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
    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        opacity: 0.5
    }, 
})
export default LeftDrawerContent