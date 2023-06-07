import { Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Text } from "@rneui/themed"
import { useCallback, useEffect, useState } from "react"
import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { Checkbox, Chip, Searchbar } from "react-native-paper"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack"
import API from "../../api"
import { AuthStackParamList } from "../../compoments/Nagivation/TypeNavigation"
import { ROUTES } from "../../enums/RouteEnum"
import { current } from "@reduxjs/toolkit"

interface ICategoryList {
    id: number;
    name: string;
}

interface ICategoryListWithCheckStatus extends ICategoryList {
    checked?: boolean;
}

type navigator = NativeStackNavigationProp<AuthStackParamList, ROUTES.CHOOSE_CATEGORY>

const ChooseCategoryScreen : React.FC<{navigation : navigator}> = ({navigation}) =>{
    const [data, setData] = useState<ICategoryList[]>([])
    const [id, setId] = useState<number[]>([])
    const [category, setCategory] = useState<string[]>([])
    const [foo, setFoo] = useState<ICategoryListWithCheckStatus[]>([])
    const [foo1, setFoo1] = useState<ICategoryListWithCheckStatus[]>([])
    const [request_time, setRequest_time] = useState(0)
    const [onClose, setOnClose] = useState(false)

    const handleClose = async () => setOnClose(!onClose);

    const [value, setValue] = useState('')

    useEffect(()=>{
        const test = () => API.ListOfCategories(request_time, id).then(res => res.json())
            .then(res => setData(res))
            .catch(e => (e as Error).message);
        test();
    },[request_time])

    useEffect(() =>{
        data.forEach(item =>{
            setFoo1(prev => [
                ...prev, 
                {
                    id: item.id,
                    name: item.name,
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
                            checked: false
                        }
                    ])
                }
            })
        }
    },[foo1])

    const onSubmit = () =>{
        API.AddCategories({
            category_name: category
        }).then((res)=>{
            console.log(res.status)
            if(res.status === 200){
                navigation.navigate(ROUTES.INIT_COMMUNITY)
            }
        }).catch(e => (e as Error).message);
    }

    const onCheck = async (item: ICategoryListWithCheckStatus, index: number) =>{
            setFoo([...foo.map((item, i) =>
                       i=== index ? { ...item, checked: !item.checked} : item
                     ),
                   ]);
           }
//note: for best practice, not to apply mutation approach in current state. Value changes, the state doesn't seem to update
    return (
        <Stack space={4} style={styles.container}>
            <Searchbar 
                placeholder="Search" 
                value={value} 
                onChangeText={text => setValue(text)}
                style={styles.search}/>
            <ScrollView style={styles.scrollview}>
                <Inline space={3}>
                    {category?.length != 0 ? (
                        category?.map((item, index)=>{
                            return(                            
                                <Chip key={index} 
                                    onClose={()=> [setCategory(current => current.splice(index, 1)), handleClose().then(()=>{
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
                    ) : <Text style={{alignSelf: 'center', opacity: 0.5}}>No category has chosen</Text>}
                    </Inline>
            </ScrollView>
            <ScrollView style={styles.category}>
                <Stack space={2}>
                    {foo.length != 0 ? (
                        foo.map((item, index: number)=>{
                            return(
                                <Inline key={index} alignX={"between"} alignY={'center'}>
                                    <Text style={{fontSize: 15, fontWeight: '700'}}>{item.name}</Text>
                                    <Checkbox
                                        status={ item.checked ? 'checked' : 'unchecked' }
                                        onPress={()=> onCheck(item, index).then(()=>{
                                            if(!item.checked){
                                                setCategory(prev => [
                                                    ...prev,
                                                    item.name
                                                ])
                                            }else{
                                                setCategory(current => current.filter(e => e !== item.name))
                                            }
                                        })}
                                    />
                                </Inline>
                            )
                        })
                    ) : <Text>Jom mix ort rerender JG?????????</Text>}
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
export default ChooseCategoryScreen

