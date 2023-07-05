import { Inline, Stack } from "@mobily/stacks";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Icon, Image, Text } from "@rneui/themed";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import API from "../../api";
import { useAppSelector } from "../../store/hooks";
import AppbarAction from "react-native-paper/lib/typescript/src/components/Appbar/AppbarAction";
import { ROUTES } from "../../enums/RouteEnum";

enum ERBSheetHeight{
    MIN = 200, 
    MAX = 540
}

interface IAnswerProps{
    answer?: string;
    photo?: string;
}

interface IProps{
    onOpenGallery?: () => void;
    rbRef?: LegacyRef<RBSheet>;
    backPress?: () => void;
}

const CommentBottomSheet: React.FC<IProps> = ({
    onOpenGallery,
    rbRef,
    backPress,
}) =>{
    const navigation = useNavigation()
    const [rbsInputHeight, setRbsInputHeight] = useState(0)
    const [rbsHeight, setRbsHeight] = useState<ERBSheetHeight>(ERBSheetHeight.MIN)
    const [answerProps, setAnswerProps] = useState<IAnswerProps>()
    const parent_id = useAppSelector(state => state.IdReducer.comment_parent)
    const answer_id = useAppSelector(state => state.IdReducer.answer_id)
    useEffect(()=>{
        if(rbsInputHeight >= 100) setRbsHeight(ERBSheetHeight.MAX) 
    },[rbsInputHeight>200])

    const onToggle = () => {
        if(rbsHeight === ERBSheetHeight.MIN) setRbsHeight(ERBSheetHeight.MAX)
        if(rbsHeight === ERBSheetHeight.MAX) setRbsHeight(ERBSheetHeight.MIN)
    }

    const openGallery = async () =>{
        const data = await launchImageLibrary({
                includeBase64: true,
                mediaType: "photo"
            }).then((e : any) => 
                e.assets!.map((item: any, index: string | number)=>{
                    setAnswerProps(prev => ({...prev, photo: e.assets[index].base64}))})
            )
        }
    const postAnswer = () => {
        API.CommentAnswer({
            comment: answerProps?.answer as string,
            parent_id: parent_id as number,
            photo: answerProps?.photo as string,
        }, answer_id as number).then(res => {
            if(res.status){
                navigation.dispatch(StackActions.push(ROUTES.SPECIFIC_QUESTION))
            }})
    }
    console.log(parent_id)
    return(
        <RBSheet ref={rbRef} 
                 closeOnPressBack={true}
                 animationType="slide" 
                 customStyles={{
                 container:{
                    height: rbsHeight
                  }
                 }}                     
                    >
                <ScrollView >
                    <Stack padding={2} 
                           onLayout={(event)=> {
                                        var {height} = event.nativeEvent.layout;
                                        setRbsInputHeight(height);
                                }}
                            >
                        <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={()=> onToggle()}>
                            {rbsHeight === ERBSheetHeight.MIN && <Icon name="arrowsalt" type="antdesign"/>}
                            {rbsHeight === ERBSheetHeight.MAX && <Icon name="shrink" type="antdesign"/>}
                        </TouchableOpacity>
                        <TextInput multiline 
                                    placeholder={"Add a comment..."}
                                    style={{color: "black", fontSize: 15, width: '95%'}}
                                    value={answerProps?.answer}
                                    onChangeText={text => setAnswerProps(prev => ({...prev, answer: text}))} 
                                    placeholderTextColor={"#8996a1"}
                                    />
                        {answerProps?.photo ? <Image source={{uri: `data:image/jpeg;base64,${answerProps.photo}`}} style={{width: "100%", height: 200}}/> : null}
                    </Stack>
                </ScrollView>
                <Inline style={[styles.footer]} alignX={'between'}>
                        <Inline space={4} alignX={"left"}>
                            <Icon name="link" type="antdesign" onPress={()=> navigation.goBack()}/>
                            <Icon name="add-photo-alternate" type="materialicon" onPress={()=> openGallery()}/>
                            <Icon name="return-up-back-sharp" type="ionicon" onPress={backPress}/>
                        </Inline>
                        {answerProps?.answer || answerProps?.photo ? <TouchableOpacity onPress={()=> postAnswer()}>
                                                                        <Text style={{padding: 15, color: 'blue'}}>Post</Text>
                                                                     </TouchableOpacity>
                                                                   : <Text style={{padding: 15, color: 'blue', opacity: 0.4}}>Post</Text>}
                </Inline>    
            </RBSheet>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 50,
        // backgroundColor: '#EE5407',
        justifyContent: "center",
        position: 'absolute', //Here is the trick
        bottom: 0,
        paddingLeft: 12
    }
})
export default CommentBottomSheet