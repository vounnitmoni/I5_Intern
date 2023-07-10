import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Icon, Image, Text } from "@rneui/themed"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import API from "../../../api"
import { ROUTES } from "../../../enums/RouteEnum"
import { useAppDispatch } from "../../../store/hooks"
import { setCommunityId } from "../../../store/IdReducer"
import { ISearchCommunity } from "../SearchInterface/ISearchResponse"

const CommunitySearch: React.FC<{search?: string}> = ({search}) =>{
    const [data, setData] = useState<ISearchCommunity[]>([])
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    useEffect(()=>{
        API.SearchCommunity({
            param: search
        }).then(res => res.json()).then(data => setData(data)).catch(e => (e as Error).message)
    },[search])

    const communityPress = async (id?: number) => {
        dispatch(setCommunityId({community_id: id}))
    }
    return(
        <FlatList 
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.cardContainer} onPress={() => communityPress(item.id)
                    .then(() => navigation.dispatch(StackActions.push(ROUTES.COMMUNITY)))
                }>
                    <Columns alignY={"center"}>
                        <Column width={"4/5"}>
                            <Inline space={2} alignY={'center'}>
                                {item.profile_pic ? <Image source={{uri : `data:image/jpeg;base64,${item.profile_pic}`}} style={{width: 40, height: 40, borderRadius: 40/2}} /> 
                                                  : <Image source={require('./../../../assets/images/community_blank_logo.png')} style={{width: 40, height: 40, borderRadius: 40/2}}/>}
                                <Stack>
                                    <Text style={{fontWeight: '700'}}>{item.name}</Text>
                                    {item.member === 1 || item.member === 0 ? <Text>{item.member} acitve member</Text>
                                                                            : <Text>{item.member} active members</Text>
                                    }
                                </Stack>
                            </Inline>
                        </Column>
                        <Column width={"1/5"}>
                            <Icon style={{alignSelf: 'flex-end'}} name="arrow-right-thin" type="material-community"/>
                        </Column>
                    </Columns>
                    <View style={styles.lineStyle}/> 
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1,
        paddingTop: 5
    },
    lineStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        opacity: 0.5
    }
})

export default CommunitySearch