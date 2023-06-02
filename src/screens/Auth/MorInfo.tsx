import { Box, Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Button } from "@rneui/base";
import { CheckBox, Icon, Image, Input } from "@rneui/themed"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text,TouchableOpacity } from "react-native"
import { RadioButton, TextInput } from "react-native-paper";

type FormValues = {
    firstname: string;
    lastname: string;
    gender: string;
    dob: Date;
    number: string;
}

const MoreInfoScreen = () =>{
    const [checked, setChecked] = useState('');
    const {
        handleSubmit,
        control,
        formState: {errors},
      } = useForm<FormValues>({
        defaultValues: {
          firstname: undefined,
          lastname: undefined,
          gender: undefined,
          dob: undefined,
          number: undefined,
        },
      });
    
    return(
        <Stack style={styles.container} space={3}>
            <Stack style={{alignItems: "center"}}>
                <Image source={require('./../../assets/images/images.jpg')} style={styles.image}/>
                <TouchableOpacity>
                    <Text style={{opacity: 0.8, color: 'blue'}}>Set your profile picture</Text>
                </TouchableOpacity>
            </Stack>
            <Stack style={{padding: 20, paddingLeft: 30}} space={4}>
                <Inline space={3} alignY={'center'}>
                    <Text style={{fontWeight: "700"}}>Firstname: </Text>
                    <TextInput
                        mode="outlined" 
                        placeholder="Your firstname" 
                        label={"Firstname"} 
                        maxLength={30}
                        outlineStyle={{borderRadius: 10}}
                        style={{width: 250}}/>
                </Inline>
                <Inline space={3} alignY={'center'}>
                    <Text style={{fontWeight: "700"}}>Lastname: </Text>
                    <TextInput mode="outlined" 
                        placeholder="Your lastname" 
                        label={"Lastname"} 
                        maxLength={30}
                        outlineStyle={{borderRadius: 10}}
                        style={{width: 250}}/>
                    {/* <Icon name="checkmark-circle-sharp" type="ionicon" color={'green'}/> */}
                </Inline>
                <Columns alignY={'center'} >
                    <Column>
                        <Text style={{fontWeight: "700"}}>Gender: </Text>
                    </Column>
                    <Column>
                        <Inline alignY={'center'}>
                            <Text>Male</Text>
                            <RadioButton
                                value="M"
                                status={ checked === 'M' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('M')}
                            />
                            <Text>Female</Text>
                            <RadioButton
                                value="F"
                                status={ checked === 'F' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('F')}
                            />
                        </Inline>
                    </Column>                    
                </Columns>
                <Inline space={3} alignY={'center'}>
                    <Text style={{fontWeight: "700"}}>Date of birth: </Text>
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
                    <Text style={{fontWeight: "700"}}>Number:     </Text>
                    <TextInput mode="outlined" 
                        placeholder="Phone number" 
                        label={"Firstname"} 
                        maxLength={12}
                        outlineStyle={{borderRadius: 10}}
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
                    onPress={()=>null}
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