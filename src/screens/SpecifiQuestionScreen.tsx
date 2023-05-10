import { Text } from "@rneui/themed"
import { useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import API from "../api"
import PostCard from "../compoments/Post/PostCard";

interface IData{
    id: number;
    question: string;
    body: string; 
    post_duration: Date; 
    community: string;
    answer: number
    vote: number
  }

const SpecificQuestionScreen = () =>{
    const question_id = useAppSelector(state => state.questionId.q_id);
    const [object, setObject] = useState<IData>();
    useEffect(()=>{
        API.QuestionById(question_id).then(res => res.json())
        .then(async e => setObject(e))
        .catch(e => (e as Error).message);
    }, [])
    return(
       <>
            <PostCard 
                title={object?.question}
                description={object?.body}
                community={object?.community}
                answer={object?.answer}
                vote={object?.vote}
            />
       </>
    )
}
export default SpecificQuestionScreen