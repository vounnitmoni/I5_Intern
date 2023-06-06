import { Box, Column, Columns, Inline, Stack } from "@mobily/stacks"
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@rneui/base";
import { CheckBox, Icon, Image, Input } from "@rneui/themed"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text,TouchableOpacity } from "react-native"
import { RadioButton, TextInput } from "react-native-paper";
import { AuthStackParamList, RootStackParamList } from "../../compoments/Nagivation/TypeNavigation";
import { ROUTES } from "../../enums/RouteEnum";
import { launchImageLibrary } from "react-native-image-picker";
import API from "../../api";

type FormValues = {
    firstname?: string;
    lastname?: string;
    gender?: number;
    dob?: Date;
    number?: string;
    profile?: string;
}
interface photoData{
    uri: string;
    base64: string;
}

type navigation = StackNavigationProp<AuthStackParamList, ROUTES.MORE_INFO>;
const MoreInfoScreen : React.FC<{navigation: navigation}> = ({navigation}) =>{
    const [checked, setChecked] = useState<number>();
    const [photo, setPhoto] = useState<photoData>()
    const [formData, setFormData] = useState<FormValues>()

    const handleRequest = () =>{
        API.AddMoreProfileInfo({
            firstname: formData?.firstname,
            lastname: formData?.lastname,
            gender: checked,
            dob: null,
            area_number: formData?.number,
            profile: formData?.profile
        }).then(data =>{
            console.log(data.status)
            if(data.status === 200){
                navigation.navigate(ROUTES.CHOOSE_CATEGORY)
            }
        })
    }

    const openGallery = async () =>{
        const data = await launchImageLibrary({
                includeBase64: true,
                mediaType: "photo"
            }).then((e : any) => 
                e.assets!.map((item: any, index: string | number)=>{
                    setPhoto({
                        base64: e.assets[index].base64,
                         uri : e.assets[index].uri
                    }),
                    setFormData(prevState => ({
                        ...prevState,
                        profile: e.assets[index].base64
                    }))
                })
            )
    }

    return(
        <Stack style={styles.container} space={3}>
            <Stack style={{alignItems: "center"}} space={2}>
                <Image source={{uri: photo?.uri}} style={styles.image}/>
                <TouchableOpacity onPress={()=> openGallery()}>
                    <Text style={{opacity: 0.8, color: 'blue'}}>Set your profile picture</Text>
                </TouchableOpacity>
            </Stack>
            <Stack style={{padding: 20, paddingLeft: 30}} space={4}>
                <Inline space={3} alignY={'center'}>
                    <Text style={{color: 'black',fontWeight: "700"}}>Firstname: </Text>
                    <TextInput
                        mode="outlined" 
                        placeholder="Your firstname" 
                        label={"Firstname"} 
                        maxLength={30}
                        outlineStyle={{borderRadius: 10}}
                        onChangeText={text => setFormData(prev => ({...prev, firstname: text}))}
                        style={{width: 250}}/>
                </Inline>
                <Inline space={3} alignY={'center'}>
                    <Text style={{color: 'black', fontWeight: "700"}}>Lastname: </Text>
                    <TextInput mode="outlined" 
                        placeholder="Your lastname" 
                        label={"Lastname"} 
                        maxLength={30}
                        outlineStyle={{borderRadius: 10}}
                        onChangeText={text => setFormData(prev => ({...prev, lastname: text}))}
                        style={{width: 250}}/>
                    {/* <Icon name="checkmark-circle-sharp" type="ionicon" color={'green'}/> */}
                </Inline>
                <Columns alignY={'center'} >
                    <Column>
                        <Text style={{color: 'black', fontWeight: "700"}}>Gender: </Text>
                    </Column>
                    <Column>
                        <Inline alignY={'center'}>
                            <Text style={{color: 'black'}}>Male</Text>
                            <RadioButton
                                value={"M"}
                                status={ checked === 1 ? 'checked' : 'unchecked' }
                                onPress={() => setChecked(1)}
                            />
                            <Text style={{color: 'black'}}>Female</Text>
                            <RadioButton
                                value="F"
                                status={ checked === 0 ? 'checked' : 'unchecked' }
                                onPress={() => setChecked(0)}
                            />
                        </Inline>
                    </Column>                    
                </Columns>
                <Inline space={3} alignY={'center'}>
                    <Text style={{color: 'black', fontWeight: "700"}}>Date of birth: </Text>
                    <TextInput mode="outlined" 
                        placeholder="dd" 
                        maxLength={2}
                        outlineStyle={{borderRadius: 10}}
                        style={{width: 50}}
                        keyboardType="numeric"
                        />
                    <TextInput mode="outlined" 
                        placeholder="mm" 
                        maxLength={2}
                        outlineStyle={{borderRadius: 10}}
                        style={{width: 60}}
                        keyboardType="numeric"/>
                    <TextInput mode="outlined" 
                        placeholder="yyyy" 
                        maxLength={4}
                        outlineStyle={{borderRadius: 10}}
                        style={{width: 100}}
                        keyboardType="numeric"/>
                    {/* <Icon name="checkmark-circle-sharp" type="ionicon" color={'green'}/> */}
                </Inline>
                <Inline space={3} alignY={'center'}>
                    <Text style={{color: 'black', fontWeight: "700"}}>Number:     </Text>
                    <TextInput mode="outlined" 
                        placeholder="Phone number" 
                        label={"Firstname"} 
                        maxLength={12}
                        outlineStyle={{borderRadius: 10}}
                        onChangeText={text => setFormData(prev => ({...prev, number: text}))}
                        style={{width: 250}}
                        keyboardType="numeric"/>
                    {/* <Icon name="checkmark-circle-sharp" type="ionicon" color={'green'}/> */}
                </Inline>
                <Button
                    title="Confirm"
                    icon={{
                    name: 'create-outline',
                    type: 'ionicon',
                    size: 22,
                    color: 'white',
                    }}
                    size="lg"
                    buttonStyle={{backgroundColor: "#EE5407", borderRadius: 15, width: 150, alignSelf: 'flex-end', marginRight: 26}}
                    onPress={()=> handleRequest()}
                />
            </Stack>
        </Stack>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop: 50,
    },
    image:{
        width: 100,
        height: 100, 
        borderRadius: 50
    }
})
export default MoreInfoScreen


// <Column width="1/5">
//                         <Text>Icon</Text>
//                     </Column >
//                     <Column width={"4/5"}>
//                         <TextInput 
//                             placeholder="First name"
//                             style={{borderColor: 'blue', borderWidth: 1, borderRadius: 7, width: 300}}
//                         />
//                     </Column>
//                 </Columns>
//                 <Columns alignY={"center"} space={4}>
//                     <Column width="1/5">
//                         <Text>Icon</Text>
//                     </Column >
//                     <Column width={"4/5"}>
//                         <TextInput 
//                             placeholder="First name"
//                             style={{borderColor: 'blue', borderWidth: 1, borderRadius: 7, width: 300}}
//                         />
//                     </Column>