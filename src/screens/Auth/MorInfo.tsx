import { Box, Inline, Stack } from "@mobily/stacks"
import { CheckBox, Image, Input } from "@rneui/themed"
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"

const MoreInfoScreen = () =>{
    return(
        <Stack style={styles.container} space={3}>
            <Stack style={{alignItems: "center"}}>
                <Image source={require('./../../assets/images/images.jpg')} style={styles.image}/>
                <TouchableOpacity>
                    <Text style={{opacity: 0.8, color: 'blue'}}>Set your profile picture</Text>
                </TouchableOpacity>
            </Stack>
            <Stack style={{width: '100%', alignItems: 'flex-start', padding: 10}}>
                <Inline style={{justifyContent: 'center'}}>
                    <Box style={{justifyContent: 'center', backgroundColor: 'red'}}>
                        <Text>Icon</Text>
                    </Box>
                    <TextInput 
                        placeholder="First name"
                        style={{borderColor: 'red', borderWidth: 1, borderRadius: 7, width: 300}}
                    />
                </Inline>
            </Stack>
        </Stack>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 100,
    },
    image:{
        width: 100,
        height: 100, 
        borderRadius: 50
    }
})
export default MoreInfoScreen