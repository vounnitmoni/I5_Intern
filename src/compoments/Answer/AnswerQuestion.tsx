import { Inline, Stack } from "@mobily/stacks"
import { Icon, Input, Text } from "@rneui/themed"
import { StyleSheet, TextInput } from "react-native"
import {useKeyboard} from './../../utils/keyboardHeight'

const AnswerQuestion = () =>{
    const keyBoardHeight = useKeyboard()
    return(
        <Stack style={[styles.container]}>
            <Inline alignY={"center"} alignX={"right"} paddingRight={2.5}>
                <Icon name="arrowsalt" type="antdesign"/>
            </Inline>
            <TextInput multiline 
                       placeholder="Add an answer..." 
                       style={{color: "black", fontSize: 15, width: '95%'}} 
                       placeholderTextColor={"#8996a1"}/>
            <Inline space={2} paddingBottom={10} style={styles.footer}>
                <Icon name="arrowsalt" type="antdesign"/>
                <Icon name="arrowsalt" type="antdesign"/>
            </Inline>
        </Stack>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        // paddingTop: 5,
        // width: '100%',
        // height: 200,
        // backgroundColor: '#fff',
        // position: 'absolute', //Here is the trick
        // paddingLeft: 12
    },
    footer:{
        position: 'relative',
        bottom: -30
    }
})

export default AnswerQuestion