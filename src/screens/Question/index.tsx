import { Inline, Stack } from "@mobily/stacks";
import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Dropdown from "../../compoments/DropDown";

interface QuestionValue{
    question: string;
    description?: string;
}


const QuestionScreen = () =>{
    const {
        handleSubmit,
        control,
        formState: {errors},
      } = useForm<QuestionValue>({
        defaultValues: {
          question: undefined,
          description: undefined,
        },
      });
    const [next, setNext] = useState(false);
    const {t}=useTranslation()
    return(
        <View style={styles.container}>
            <Stack space={3}>
                <View style={styles.containerChild}>
                    <Stack space={3} style={{margin: 10}}>
                        <TextInput multiline placeholder="Question" style={{color: "black", fontSize: 20, fontWeight: "600", width: '95%'}} placeholderTextColor={"#8996a1"}/>
                        <View style={{width: '90%', borderWidth: 0.2}}/>
                        <TextInput multiline placeholder="Text body (Optional)" style={{color: "black", fontSize: 15, width: '95%'}} placeholderTextColor={"#8996a1"}/>
                        <View style={{width: '90%', borderWidth: 0.2}}/>
                        <Dropdown label="community"/>
                    </Stack>
                </View>
            </Stack>
            <Inline space={3} alignX={'right'} style={{marginRight: 10}}>
                <Button radius={'sm'} type="solid" containerStyle={{width: 100}} buttonStyle={{backgroundColor: "red"}}>
                    Discard
                    <Icon name="clear" color="white" />
                </Button>
                <Button radius={'sm'} type="solid" containerStyle={{width: 100}} onPress={()=> setNext(true)}>
                    Post
                    <Icon name="navigate-next" color="white" />
                </Button>
            </Inline>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    containerChild:{
        minHeight: 500,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10
    },
  })
export default QuestionScreen