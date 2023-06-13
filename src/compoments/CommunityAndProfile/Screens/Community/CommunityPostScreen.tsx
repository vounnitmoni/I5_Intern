import { Text } from "@rneui/themed"
import { useState, useEffect, useRef } from "react"
import {FlatList, View} from "react-native"
import API from "../../../../api";
import { useAppSelector } from "../../../../store/hooks";
import QuestionCard from "../../Components/QuestionCard";
import { useDispatch } from "react-redux";
import { setCommunityId, setUserId } from "../../../../store/IdReducer";
import { NavigationContainerProps } from "@react-navigation/native";
import { RootStackParamList } from "../../../Nagivation/TypeNavigation";
import { ROUTES } from "../../../../enums/RouteEnum";
import { StackNavigationProp } from "@react-navigation/stack";

interface IQInfo{
    question_id?: number;
    community_id?: number;
    author_id?: number;
    community_image?: string;
    community_name?: string;
    author_name?: string;
    question?: string;
    description?: string;
    vote?: number;
    comment?: number;
    ago_number?: number;
    ago_string?: string;
    image?: string[];
}

type navigation = StackNavigationProp<RootStackParamList, ROUTES.COMMUNITY_POST>
const CommunityPostScreen: React.FC<{navigation: navigation}> = ({navigation}) =>{
    const ref = useRef(0)
    const [apiData, setApiData] = useState<IQInfo[]>([])
    const [listPrevId, setListPrevId] = useState<number[]>([]);
    const community_id = useAppSelector(state => state.IdReducer.community_id)
    const dispatch = useDispatch()

    useEffect(()=>{
        API.CommunityPosts(community_id, listPrevId).then(res => res.json())
            .then(data => {if(data.length){setApiData(data)}}).catch(e => (e as Error).message)
    },[ref.current]) 

    useEffect(()=>{
        if(apiData.length != 0){
            Array.from(apiData, child => {
                setListPrevId(prev => [...prev, child.question_id as number])
              })
        }
    },[apiData])
    
    const loadMoreData = async () =>{
        ref.current = ref.current + 1;
    }

    const communityPress = async (id?: number) => {
        dispatch(setCommunityId({community_id: id}))
    }
    const usernamePress = async (id?: number)=> {
        dispatch(setUserId({user_id: id}))
    }
    const commentPress = () => {}
    const dotsPress = () => {}
    const onPress = () => {}
    const upVotePress = ()=> {}
    const downVotePress = ()=> {}
    
    const sharePress = () => {}

    return(     
        <View>
            <FlatList
                style={{marginBottom: 310}} 
                data={apiData}
                renderItem={({item} : {item: IQInfo}) =>         
                    <QuestionCard 
                        ago_number={item.ago_number}
                        ago_string={item.ago_string}
                        author_name={item.author_name}
                        comment={item.comment}
                        commentPress={commentPress}
                        communityPress={()=> communityPress(item.community_id).then(()=> navigation.navigate(ROUTES.COMMUNITY))}
                        community_image={item.community_image}
                        community_name={item.community_name}
                        description={item.description}
                        dotsPress={dotsPress}
                        downVotePress={downVotePress}
                        image={item.image}
                        onPress={onPress}
                        question={item.question}
                        sharePress={sharePress}
                        upVotePress={upVotePress}
                        usernamePress={()=> usernamePress(item.author_id).then(()=> navigation.navigate(ROUTES.PROFILE))}
                        vote={item.vote}/>}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}
export default CommunityPostScreen