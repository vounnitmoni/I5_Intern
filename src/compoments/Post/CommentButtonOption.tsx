import { Inline } from "@mobily/stacks";
import { Icon, Text } from "@rneui/themed"
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native'
import {useState, useMemo, useEffect} from 'react';


const CommentButton : React.FC <{
    style?: StyleProp<ViewStyle>;
    vote: number | undefined;
}> = ({vote = 0}) =>{
    const [votes, setVotes] = useState(vote);
    const [iconColor, setIconColor] = useState('');

    useEffect(()=>{
        setVotes(vote);
    }, [vote])

    return(
        <Inline space={4}>
            <TouchableOpacity onPress={()=> [setVotes(vote => vote + 1)]}>
                <Icon name="arrow-up-circle-outline" type="ionicon" color={iconColor}/>
            </TouchableOpacity>
            <Text style={styles.dataStyles}>{votes}</Text>
            <TouchableOpacity onPress={()=>[setVotes(vote => vote - 1)]}>
                <Icon name="arrow-down-circle-outline" type="ionicon"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>null}>
                <Icon name="reply" type="octicon" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>null}>
                <Icon name="dots-vertical" type="material-community"/>
            </TouchableOpacity>
            {/*  */}
        </Inline>
    )
}

const styles = StyleSheet.create({
    dataStyles:{
        fontSize: 18,
        fontWeight: "600",
    }
})
export default CommentButton;