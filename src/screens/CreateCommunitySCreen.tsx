import { Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Text } from "@rneui/themed"
import { useState } from "react"
import {StyleSheet, TouchableOpacity, View } from "react-native"
import { Modal, PaperProvider, Portal, Provider, Switch, TextInput } from "react-native-paper"

const CreateCommunityScreen = () =>{
    const [isTouchOpen, setIsTouchOpen] = useState(false)
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const onTouchClose = () => setIsTouchOpen(!isTouchOpen)
      
    return(
        <Provider>
            <Stack space={4} style={styles.container}>
                <Text style={{fontWeight: "700"}}>Community name</Text>
                <TextInput mode="outlined" 
                        placeholder="Please input community name" 
                        label={"Community_name"} 
                        maxLength={21}
                        />
                <Text style={{fontWeight: "700"}}>Community type</Text>
                <TouchableOpacity onPress={()=> setIsTouchOpen(true)}>
                    <Stack space={2}>
                        <Inline space={1}>
                            <Text style={{fontSize: 20, fontWeight: '700'}}>Public</Text>
                            <Icon name="caret-down" type="ionicon" size={20} style={{opacity: 0.5}}/>
                        </Inline>
                        <Text>Anyone can view, upvote, and comment to this community</Text>
                    </Stack>
                </TouchableOpacity>
                <Inline alignX={"between"} alignY={'center'}>
                    <Text style={{fontWeight: "700"}}>Age restriction</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Inline>
                {isSwitchOn ? (
                    <TextInput mode="outlined" 
                            placeholder="Please input age" 
                            label={"Age"}
                            keyboardType="numeric"
                            maxLength={2}/>
                ): null}
                <Button
                    title="Create community"
                    icon={{
                    name: 'create-outline',
                    type: 'ionicon',
                    size: 22,
                    color: 'white',
                    }}
                    size="lg"
                    buttonStyle={{backgroundColor: "#EE5407", borderRadius: 30}}
                    onPress={()=>null}
                />               
            </Stack>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffffff",
        paddingTop: 20,
        padding: 15
    },
    modalContainer:{
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0, 
    }
})
export default CreateCommunityScreen