import { Box, Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Button } from "@rneui/base";
import { CheckBox, Image, Input } from "@rneui/themed"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import DatePicker from "react-native-date-picker";

type FormValues = {
    firstname: string;
    lastname: string;
    gender: string;
    dob: Date;
    number: string;
}

const MoreInfoScreen = () =>{
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
            <Stack style={{width: '100%', alignItems: 'flex-start', padding: 10}} space={4}>
                {/* <Inline style={{justifyContent: 'center'}}>
                    <Box style={{justifyContent: 'center', backgroundColor: 'red'}}>
                        <Text>Icon</Text>
                    </Box>
                    <TextInput 
                        placeholder="First name"
                        style={{borderColor: 'red', borderWidth: 1, borderRadius: 7, width: 300}}
                    />
                </Inline> */}
            </Stack>
        </Stack>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 100,
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