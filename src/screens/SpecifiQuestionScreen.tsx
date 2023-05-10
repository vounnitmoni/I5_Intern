import { Text } from "@rneui/themed"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import API from "../api"
import PostCard from "../compoments/Post/PostCard";
import { circularClick } from "../store/onClickRecursiveReducer";
import { View } from "react-native";

interface IData{
    id: number;
    question: string;
    body: string; 
    post_duration: Date; 
    community: string;
    answer: number;
    vote: number;
    photo: string[];
  }

const SpecificQuestionScreen = () =>{
    const question_id = useAppSelector(state => state.questionId.q_id);
    const action = useAppSelector(state => state.onClickRecursiveReducer.bool)
    const dispatch = useAppDispatch();
    const [object, setObject] = useState<IData>();
    useEffect(()=>{
        API.QuestionById({},question_id).then(res => res.json())
        .then(async e => setObject(e)).then(()=> {
            if(action == true){
                dispatch(circularClick(false));
            }else{
                dispatch(circularClick(true));
            }
        })
        .catch(e => (e as Error).message);
    }, [])
    return(
       <View>
            <PostCard 
                    title={object?.question}
                    description={object?.body}
                    community={object?.community}
                    answer={object?.answer}
                    vote={object?.vote}
                    image={object?.photo}
                    onPress={()=> console.log(object?.body)}
                />
       </View>
    )
}
export default SpecificQuestionScreen