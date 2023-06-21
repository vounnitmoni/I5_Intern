import { Box, Inline, Stack } from "@mobily/stacks";
import { Button, Icon } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../compoments/Nagivation/TypeNavigation";
import { ROUTES } from "../../enums/RouteEnum";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Venue } from "./photoList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hasCommunity } from "../../store/onClickRecursiveReducer";
import PostQuestionReducer, { resetData, setData } from "../../store/PostQuestionReducer";
import API from "../../api";

interface QuestionValue{
    question: string;
    description?: string;
}

interface imageData {
    base64: string[];
    uri: string;
}

type navigation = StackNavigationProp<RootStackParamList, ROUTES.QUESTION>

const QuestionScreen : React.FC<{navigation : navigation}> = ({navigation}) =>{
    const [next, setNext] = useState(false);
    const {t}=useTranslation();
    const communityStatus = useAppSelector(state => state.onClickRecursiveReducer.boolean)
    const [photo, setPhoto] = useState<imageData[]>([]);
    const [object, setObject] = useState<QuestionValue>({
        question: '',
        description: '',
    });
    const [exist, setExist] = useState(false);
    // const {question, body, community, image} = useAppSelector(state => state.PostQuestionReducer)
    const dispatch = useAppDispatch();
    const communityValue = useAppSelector(state => state.PostQuestionReducer.community)
    // const storeQuestionInfo = (
    //     question: string,
    //     body: string,
    //     community: string,
    //     image: string[],
    // ) => {
    //     dispatch(setData({
    //         question,
    //         body,
    //         community,
    //         image,
    //     }))
    // }
    const submitQuestion = () =>{
        API.AskQuestion({
            question: object.question,
            body: object.description,
            community: communityValue,
            photo: photo.map((x)=> x.base64)
        }).then(res => res.json()).then(()=>navigation.goBack())
    }

    const post = () =>{
        return dispatch(hasCommunity(false))
    }

    const reset = () =>{
        return dispatch(resetData());
    }

    const openGallery = async () =>{
        const data = await launchImageLibrary({
                includeBase64: true,
                mediaType: "photo"
            }).then((e : any) => 
                e.assets!.map((item: any, index: string | number)=>{
                    setPhoto(prev => [
                        ...prev, 
                        {
                            base64: e.assets[index].base64,
                            uri : e.assets[index].uri
                        }
                    ])
                })
            ).then(()=> {
                setExist(true)
            })
        }
    return(
        <SafeAreaView style={styles.container}>
            <Stack space={2} style={styles.wrapper}>
                <Box alignX={"between"} direction={"row"} style={{alignItems: "center"}}>
                    <TouchableOpacity>
                        <Icon name="return-up-back-sharp" type="ionicon" onPress={()=> [post(), reset(), navigation.goBack()]}/>
                    </TouchableOpacity>
                    {communityStatus ? (<Button size="sm" buttonStyle={{borderRadius: 8, backgroundColor: '#3189e7'}} title={"Post"} onPress={()=> [post(), submitQuestion(), console.log(photo.map(x=> x.uri))]}/>) 
                                     : (<Button size="sm" buttonStyle={{borderRadius: 8, backgroundColor: '#3189e7'}} title={"Next"} onPress={()=> navigation.navigate(ROUTES.COMMUNITYLIST)}/>)}
                </Box>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {exist && photo.map((item, index)=>{
                        return(
                            <Venue image={{uri : item.uri} as any} key={index}/>
                        )
                    })}
                </ScrollView>
                <TextInput 
                    multiline 
                    placeholder="Question" 
                    style={{color: "black", fontSize: 20, fontWeight: "600", width: '95%'}} 
                    placeholderTextColor={"#8996a1"}
                    autoFocus={true}
                    onChangeText={text => setObject(prev => ({
                        ...prev,
                        question : text
                    }))}
                    value={object.question}/>
                <View style={{width: '90%', borderWidth: 0.2}}/>
                <TextInput multiline 
                           placeholder="Text body (Optional)" 
                           style={{color: "green", fontSize: 15, width: '95%'}} 
                           placeholderTextColor={"#8996a1"}
                           onChangeText={text => setObject(prev => ({
                                ...prev,
                                description : text
                           }))}
                           value={object.description}/>
                        
            </Stack>
            <View style={[styles.footer]}>
                <Inline space={4} alignX={"left"}>
                    <Icon name="link" type="antdesign" onPress={()=> navigation.goBack()}/>
                    <Icon name="add-photo-alternate" type="materialicon" onPress={()=> openGallery()}/>
                    <Icon name="return-up-back-sharp" type="ionicon" onPress={()=> navigation.goBack()}/>
                </Inline>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    containerChild:{
        minHeight: 500,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    wrapper:{
        padding: 12,
    },
    footer: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: "center",
        position: 'absolute', //Here is the trick
        bottom: 0,
        paddingLeft: 12
    }
  })
export default QuestionScreen






//<Stack space={3}>
            //     <View style={styles.containerChild}>
            //         <Stack space={3} style={{margin: 10}}>
            //             <TextInput multiline placeholder="Question" style={{color: "black", fontSize: 20, fontWeight: "600", width: '95%'}} placeholderTextColor={"#8996a1"}/>
            //             <View style={{width: '90%', borderWidth: 0.2}}/>
            //             <TextInput multiline placeholder="Text body (Optional)" style={{color: "black", fontSize: 15, width: '95%'}} placeholderTextColor={"#8996a1"}/>
            //             <View style={{width: '90%', borderWidth: 0.2}}/>
            //             <Dropdown label="community"/>
            //         </Stack>
            //     </View>
            // </Stack>
            // <Inline space={3} alignX={'right'} style={{marginRight: 10}}>
            //     <Button radius={'sm'} type="solid" containerStyle={{width: 100}} buttonStyle={{backgroundColor: "red"}}>
            //         Discard
            //         <Icon name="clear" color="white" />
            //     </Button>
            //     <Button radius={'sm'} type="solid" containerStyle={{width: 100}} onPress={()=> setNext(true)}>
            //         Post
            //         <Icon name="navigate-next" color="white" />
            //     </Button>
            // </Inline>