import { Stack } from "@mobily/stacks";
import { Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import BottomOption from "./BottomOptionCard";
import HeaderCard from "./HeaderCard";
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native'
import { useAppSelector } from "../../store/hooks";
import ImageSlide from "./ImageSlider";

const PostCard : React.FC<{
    title: string | undefined;
    description?: string | undefined;
    community: string | undefined;
    image?: string[];
    vote: number | undefined;
    answer: number | undefined;
    botton?: boolean;
    ago: number;
    ago_status: string;
    dotsOnpress: ()=> void;
    usernameOnPress: ()=> void;
    communityOnPress: ()=> void;
    username: string;
    onPress?: ()=> {} | void;
}> = ({title, 
       description, 
       image, 
       community,
       answer, 
       vote, 
       botton= true,
       onPress, 
       ago, 
       ago_status,
       dotsOnpress, 
       usernameOnPress,
       communityOnPress, 
       username}) =>
{
    const [line, setLine] = useState(0);
    const [margin, setMargin] = useState(0);
    const bool = useAppSelector(state => state.onClickRecursiveReducer.bool)
    useEffect(()=>{
        if(image){
            setLine(2);
        }else{
            setLine(3)
        }
    },[image, bool])

    useEffect(()=>{
        if(description == ''){
            setMargin(-20)
        }
    },[bool])

    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Stack style={styles.wrapper} space={3}>
                <HeaderCard ago={ago} 
                            ago_status={ago_status}
                            dotsOnPress={dotsOnpress} 
                            usernameOnPress={usernameOnPress} 
                            community={community} 
                            communityOnPress={communityOnPress}
                            name={username}/>
                <Text style={styles.title}
                      numberOfLines={line} 
                      ellipsizeMode='tail'
                >
                    {title}
                </Text>
                {image ? (
                   <View style={{marginTop: 10, marginBottom: 10}}>
                        <ImageSlide base64={image}/>
                   </View>
                ) : (<Text
                        numberOfLines={3} 
                        ellipsizeMode='tail'
                        style={{marginTop: margin}}
                    >
                        {description}
                    </Text>
                )}
                {botton ? (
                    <BottomOption comment={answer} vote={vote}/>) : null
                }
            </Stack>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    wrapper:{
        padding: 12,
    },
    header:{},
    title:{
        fontSize: 20,
        fontWeight: "600",
    },
    description:{},
})

export default PostCard;