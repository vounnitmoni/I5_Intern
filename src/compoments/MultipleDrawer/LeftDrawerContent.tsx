import { Inline, Stack } from "@mobily/stacks"
import { Icon, Image, Text } from "@rneui/themed"
import { Key, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface ICData {
    image: string;
    community_name: string;
}

const LeftDrawerContent = (props : any) =>{
    const [recentlyCommunityData, setRecentlyCommunityData] = useState<ICData[]>([]);
    const [yourCommunityData, setYourCommunityData] = useState<ICData[]>([])
    const [youOwnerCommunity, setYouOwnerCommunity] = useState<ICData[]>([])

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
                                <Text>{item.community_name}</Text>
                            </Inline>
                        )
                    })}
                </Stack> 
            ): null}
            <View style={styles.line}/>
            <Text style={{fontWeight: '700'}}>Your Communities</Text>
            <TouchableOpacity >
                <Inline space={6}>
                    <Icon name="plus" type="antdesign"/>
                    <Text>Create a community</Text>
                </Inline>
            </TouchableOpacity>
            <View style={styles.line}/>
            {yourCommunityData ? (
                <Stack space={4}>
                    {yourCommunityData.map((item: ICData, index: number)=>{
                        return(
                            <Inline key={index} space={6} alignY={"center"}>
                                <Image source={require('./../../assets/images/test-community-logo.png')} style={{width: 30, height: 30, borderRadius: 15}}/>
                                <Text>{item.community_name}</Text>
                            </Inline>
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