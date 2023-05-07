import { Stack } from "@mobily/stacks";
import { Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import BottomOption from "./BottomOptionCard";
import HeaderCard from "./HeaderCard";
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native'


const PostCard : React.FC<{
    title: string;
    description?: string;
    image?: string;
    onPress?: ()=> void;
}> = ({title, description, image, onPress}) =>{
    const [line, setLine] = useState(0);
    useEffect(()=>{
        if(image){
            setLine(2);
        }else{
            setLine(3)
        }
    },[image])

    return(
        <TouchableOpacity style={styles.container} onPress={()=> null}>
            <Stack style={styles.wrapper} space={4}>
                <HeaderCard community="com/Cambodia"/>
                <Text style={styles.title}
                      numberOfLines={line} 
                      ellipsizeMode='tail'
                >
                    {title}
                </Text>
                {image ? (
                    <Text>Image</Text>
                ) : (<Text
                    numberOfLines={3} 
                    ellipsizeMode='tail'
                >
                        {description}
                    </Text>)}
                <BottomOption comment={30} vote={60}/>
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