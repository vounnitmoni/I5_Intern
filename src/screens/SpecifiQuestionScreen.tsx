import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Text } from "@rneui/themed"
import { useState } from "react"
import { StyleSheet, StatusBar, TextInput} from "react-native"
import { Avatar } from "react-native-paper"
import QuestionCard from "../compoments/CommunityAndProfile/Components/QuestionCard"

const SpecificQuestionScreen = () =>{
    const [photo, setPhoto] = useState()
    return(
        <Stack style={styles.container}>
            <Columns style={{width: '90%'}} alignX={"between"} alignY={"center"}>
                {photo ? <Image /> : <Avatar.Text label="XD" size={35}/>}
                <Column width={'4/5'}>
                    <TextInput multiline 
                            placeholder={"Add an answer..."}
                            style={{color: "black", fontSize: 15}}
                            placeholderTextColor={"#8996a1"}/>
                </Column>
            </Columns>
        </Stack>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        padding: 10,
        backgroundColor: ''
    }
})

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