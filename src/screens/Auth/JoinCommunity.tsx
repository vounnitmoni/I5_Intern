import { Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Image, Text } from "@rneui/themed"
import { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { Checkbox, Chip, Searchbar } from "react-native-paper"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack"
import API from "../../api"
import { AuthStackParamList, RootStackParamList } from "../../compoments/Nagivation/TypeNavigation"
import { ROUTES } from "../../enums/RouteEnum"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { circularClick } from "../../store/onClickRecursiveReducer"

interface ICommunityList {
    id: number;
    name: string;
    profile_pic: string;
    members: number;
}

interface ICommunityListWithCheckStatus extends ICommunityList {
    checked?: boolean;
}

type navigator = NativeStackNavigationProp<RootStackParamList, ROUTES.INIT_COMMUNITY>

const FirstJoinCommunityScreen : React.FC<{navigation : navigator}> = ({navigation}) =>{
    const request_time = useRef(0)
    const [data, setData] = useState<ICommunityList[]>([])
    const [id, setId] = useState<number[]>([])
    const [communityList, setCommunityList] = useState<number[]>([])
    const [communityName, setCommunityName] = useState<string[]>([])
    const [foo, setFoo] = useState<ICommunityListWithCheckStatus[]>([])
    const [foo1, setFoo1] = useState<ICommunityListWithCheckStatus[]>([])
    const [onClose, setOnClose] = useState(false)
    const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
    const dispatch = useAppDispatch()

    const handleClose = async () => setOnClose(!onClose);

    const [value, setValue] = useState('')

    useEffect(()=>{
        const test = () => API.CommunityRecommend(id).then(res => res.json())
            .then(res => setData(res))
            .catch(e => (e as Error).message);
        test();
    },[request_time.current])

    useEffect(() =>{
        data.forEach(item =>{
            setFoo1(prev => [
                ...prev, 
                {
                    id: item.id,
                    name: item.name,
                    profile_pic: item.profile_pic,
                    members: item.members,
                    checked: false
                }
            ])
        })
    },[data])

    useEffect(()=>{
        if(foo.length == 0){
            foo1?.forEach(item =>{
                setFoo(prev => [
                    ...prev, 
                    {
                        id: item.id,
                        name: item.name,
                        profile_pic: item.profile_pic,
                        members: item.members,
                        checked: false
                    }
                ])
            })
        }else{
            foo1?.forEach((item)=>{
                if(foo.includes(item)){
                    setFoo1(prev => [
                        ...prev, 
                        {
                            id: item.id,
                            name: item.name,
                            profile_pic: item.profile_pic,
                            members: item.members,
                            checked: false
                        }
                    ])
                }
            })
        }
    },[foo1])

    const onSubmit = () =>{
        API.JoinRecommendCommunity(communityList)
        .then(res=>{
            if(res.status === 200){
                if(action == true){
                    dispatch(circularClick(false));
                }else{
                    dispatch(circularClick(true));
                }
            }
        })
        .catch(e => (e as Error).message);
    }

    const onCheck = async (item: ICommunityListWithCheckStatus, index: number) =>{
            setFoo([...foo.map((item, i) =>
                       i === index ? { ...item, checked: !item.checked} : item
                     ),
                   ]);
           }

    return (
        <Stack space={4} style={styles.container}>
            <Searchbar 
                placeholder="Search" 
                value={value} 
                onChangeText={text => setValue(text)}
                style={styles.search}/>
            <ScrollView style={styles.scrollview}>
                <Inline space={3}>
                    {communityName?.length != 0 ? (
                        communityName?.map((item, index)=>{
                            return(                            
                                <Chip key={index} 
                                    onClose={()=> [setCommunityName(current => current.splice(index, 1)), setCommunityList(current => current.splice(index, 1)), handleClose().then(()=>{
                                        setFoo([...foo.map((i) =>
                                            i.name === item ? { ...i, checked: !i.checked} : i
                                          ),
                                        ]);
                                    })]}
                                    closeIcon={"close"}>
                                        {item}
                                </Chip>                            
                            )
                        })
                    ) : <Text style={{alignSelf: 'center', opacity: 0.5}}>No community has been chosen</Text>}
                    </Inline>
            </ScrollView>
            <ScrollView style={styles.category}>
                <Stack space={2}>
                    {foo.length != 0 ? (
                        foo.map((item, index: number)=>{
                            return(
                                <Inline key={index} alignX={"between"} alignY={'center'}>
                                    <Inline space={2} alignX={"center"}>
                                        <Image source={{uri : `data:image/jpeg;base64,${item.profile_pic}`}} style={{width: 60, height: 60, borderRadius: 30}}/>
                                        <Stack space={2}>
                                            <Text style={{fontWeight: "700"}}>{item.name}</Text>
                                            <Text style={{opacity: 0.7}}>{item.members} active members</Text>
                                        </Stack>
                                    </Inline>
                                    <Checkbox
                                        status={ item.checked ? 'checked' : 'unchecked' }
                                        onPress={()=> onCheck(item, index).then(()=>{
                                            if(!item.checked){
                                                setCommunityName(prev => [...prev, item.name])
                                                setCommunityList(prev => [...prev, item.id])
                                            }else{
                                                setCommunityList(current => current.filter(e => e !== item.id))
                                                setCommunityName(current => current.filter(e => e !== item.name))
                                            }
                                        })}
                                    />
                                </Inline>
                            )
                        })
                    ) : null}
                </Stack>
            </ScrollView>
            {/* <FlatList /> */}
            <Button
                title="Confirm"
                icon={{
                name: 'create-outline',
                type: 'ionicon',
                size: 22,
                color: 'white',
                }}
                size="lg"
                buttonStyle={{backgroundColor: "#EE5407", 
                                borderRadius: 15, 
                                width: 150, 
                                alignSelf: 'flex-end'}}
                onPress={()=> [onSubmit()]}
                />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        padding: 20,
    },
    search:{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    scrollview:{
        maxHeight: 100, 
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff"
    },
    category:{
        minHeight: 500,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    }
})
export default FirstJoinCommunityScreen