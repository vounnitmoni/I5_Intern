import { Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Text } from "@rneui/themed"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Checkbox, Chip, List, RadioButton, Searchbar } from "react-native-paper"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack"
import API from "../../api"
import { AuthStackParamList } from "../../compoments/Nagivation/TypeNavigation"
import { ROUTES } from "../../enums/RouteEnum"

type navigator = NativeStackNavigationProp<AuthStackParamList, ROUTES.CHOOSE_CATEGORY>

const ChooseCategoryScreen : React.FC<{navigation : navigator}> = ({navigation}) =>{
    const [checked, setChecked] = useState(false)
    const [id, setId] = useState<Set<number>>()
    const [category, setCategory] = useState<string[]>([]);
    const [request_time, setRequest_time] = useState(0)
    const [onPress, setOnPress] = useState(false)

    const handleOnPress = () => setOnPress(!onPress);

    const [value, setValue] = useState('')

    useEffect(()=>{
        API.ListOfCategories(request_time, id).then(res => res.json)
            .then(res => setCheckBoxData());
    },[request_time])

    const onSubmit = () =>{
        const setData = new Set(category);
        API.AddCategories({
            setData
        }).then((res)=>{
            if(res.status === 200){
                navigation.navigate(ROUTES.INIT_COMMUNITY)
            }
        }).catch(e => (e as Error).message);
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
                    {category?.length != 0 ? (
                        category?.map((item, index)=>{
                            return(                            
                                <Chip key={index} 
                                    onClose={()=> [category.splice(index, 1), handleOnPress()]}
                                    closeIcon={"close"}>
                                        {item}
                                </Chip>                            
                            )
                        })
                    ) : <Text style={{alignSelf: 'center', opacity: 0.5}}>No category has chosen</Text>}
                    </Inline>
            </ScrollView>
            {/* <ScrollView style={styles.category}>
                <Stack space={2}>
                    {checkBoxData?.length != 0 ? (
                        checkBoxData?.map((item, index)=>{
                            return(
                                <Inline key={index} alignX={"between"} alignY={'center'}>
                                    <Text style={{fontSize: 15, fontWeight: '700'}}>{item.category}</Text>
                                    <Checkbox
                                        status={ item.isChecked ? 'checked' : 'unchecked' }
                                        onPress={() => [setChecked(), setCategory(item.category)]}
                                    />
                                </Inline>
                            )
                        })
                    ): null}
                </Stack>
            </ScrollView> */}
            <FlatList 
                data={}
                renderItem={}
                onEndReached={}
                onEndReachedThreshold={}
            />
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