import { Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Text } from "@rneui/themed"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Checkbox, Chip, List, RadioButton, Searchbar } from "react-native-paper"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack"
import { AuthStackParamList } from "../../compoments/Nagivation/TypeNavigation"
import { ROUTES } from "../../enums/RouteEnum"

interface chipData {
    id: number;
    category: string;
}
interface checkBoxData {
    category: string;
    isChecked: boolean;
}

type navigator = NativeStackNavigationProp<AuthStackParamList, ROUTES.CHOOSE_CATEGORY>

const ChooseCategoryScreen : React.FC<{navigation : navigator}> = ({navigation}) =>{
    const [checked, setChecked] = useState(false)
    const [checkBoxData, setCheckBoxData] = useState<checkBoxData[]>()
    const [category, setCategory] = useState<chipData[]>();
    const [onPress, setOnPress] = useState(false)
    const handleOnPress = () => setOnPress(!onPress);
    const [value, setValue] = useState('')

    useEffect(()=>{

    })

    useEffect(()=>{
        setCategory([])
    },[onPress])
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
                                        {item.category}
                                </Chip>                            
                            )
                        })
                    ) : <Text style={{alignSelf: 'center', opacity: 0.5}}>No category has chosen</Text>}
                    </Inline>
            </ScrollView>
            <ScrollView style={styles.category}>
                <Stack space={2}>
                    {checkBoxData?.length != 0 ? (
                        checkBoxData?.map((item, index)=>{
                            return(
                                <Inline key={index} alignX={"between"} alignY={'center'}>
                                    <Text style={{fontSize: 15, fontWeight: '700'}}>{item.category}</Text>
                                    <Checkbox
                                        status={ item.isChecked ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked(!item.isChecked)}
                                    />
                                </Inline>
                            )
                        })
                    ): null}
                </Stack>
            </ScrollView>
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
                onPress={()=> navigation.navigate(ROUTES.INIT_COMMUNITY)}
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