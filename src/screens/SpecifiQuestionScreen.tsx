import { Text } from "@rneui/themed"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import React, { useEffect, useState } from "react"
import API from "../api"
import PostCard from "../compoments/Post/PostCard";
import { ScrollView, View } from "react-native";
import { Stack } from "@mobily/stacks";
import CommentCard from "../compoments/Post/CommentCard";
import { IAnswerData, ICommentData, IQuestionData } from "../interfaces/IAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IData {
    answer: IAnswerData[];
    comment: ICommentData[];
}

const SpecificQuestionScreen = () =>{
    const question_id = useAppSelector(state => state.questionId.q_id);
    const [object, setObject] = useState<IQuestionData>();
    const [answerObject, setAnswerObject] = useState<IData>({
        answer: [],
        comment: [],
    });
    const flag : number = 0;

    useEffect(()=>{ 
        API.QuestionById({},question_id).then(res => res.json())
        .then(async e => setObject(e))
        .catch(e => (e as Error).message);
    }, [])

    useEffect(()=>{
        API.AnswerandComment({question_id, flag}).then(res => res.json()).then(async data =>{
            await AsyncStorage.mergeItem('data', JSON.stringify(data));
        }).then(async () =>{
            await AsyncStorage.getItem('data').then((req : any)=> JSON.parse(req))
                .then(async data=>{
                    setAnswerObject({
                        answer: data.answers,
                        comment: data.comments,
                    })
                })
                .catch(e => (e as Error).message);
        })
        
    },[flag])
    const recursiveComment = (props : number) : React.ReactNode | React.ReactNode[] => 
            <Stack>
                {answerObject.comment.map((item, index)=>{
                    {answerObject.comment.map((item1, index1)=>{
                        if(item1.parent_id === item.id){
                            return(
                                <CommentCard ago={49} styleProp={{minusMaxWidth: 20}} answer={item1.comment} key={index1}/>
                            )
                        }
                    })}
                    if(item.parent_id == props){
                        return(
                            <CommentCard ago={49} styleProp={{minusMaxWidth: 15}} answer={item.comment} key={index} />
                        )
                    }
                })}
            </Stack>

    const renderAnswer = (props: any) : React.ReactNode | React.ReactNode[] => 
            <Stack space={3}>
                {answerObject.comment.map((item, index)=>{
                    if(item.answer_id == props && item.parent_id === null){
                        return(
                            <CommentCard key={index} styleProp={{minusMaxWidth: 10}} ago={30} answer={item.comment} children={recursiveComment(item.id)}/>
                        )
                    }else if(item.id){

                    }
                })}
            </Stack>
            
    return(
       <ScrollView >
            <Stack space={2}>
                <PostCard 
                        title={object?.question}
                        description={object?.body}
                        community={object?.community}
                        answer={object?.answer}
                        vote={object?.vote}
                        image={object?.photo}
                        onPress={()=> console.log(object?.body)}
                    />
                {answerObject.answer.map((item, index)=>{
                    return(
                        <CommentCard answer={item.answer} ago={20} key={index} children={renderAnswer(item.id)} />
                    )
                })}
            </Stack>
       </ScrollView>
    )
}
export default SpecificQuestionScreen




// .then(()=> {
//     if(action == true){
//         dispatch(circularClick(false));
//     }else{
//         dispatch(circularClick(true));
//     }
// })\




//  return AsyncStorage.getItem('somekey')
// .then(req => JSON.parse(req))
// .then(json => console.log(json))
// .catch(error => console.log('error!'));

// const someArray = [1,2,3,4];
// return AsyncStorage.setItem('somekey', JSON.stringify(someArray))
// .then(json => console.log('success!'))
// .catch(error => console.log('error!'));