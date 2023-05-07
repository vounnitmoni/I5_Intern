import { Inline } from "@mobily/stacks";
import { Icon, Text } from "@rneui/themed"
import {TouchableOpacity, StyleSheet} from 'react-native'
import {useState, useMemo, useEffect} from 'react';


const BottomOption : React.FC <{
    vote: number;
    comment: number;
}> = ({vote = 0 , comment = 0}) =>{
    const [votes, setVotes] = useState(vote);
    const [comments, setComments] = useState(comment);
    const [iconColor, setIconColor] = useState('');

    useEffect(()=>{
        setComments(comment);
        setVotes(vote);
    }, [vote, comment])

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
                <Icon name="comment-outline" type="material-community" />
            </TouchableOpacity>
            <Text style={styles.dataStyles}>{comments}</Text>
            <TouchableOpacity onPress={()=>null}>
                <Icon name="md-arrow-redo-outline" type="ionicon"/>
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
export default BottomOption;