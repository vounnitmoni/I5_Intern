import { Column, Columns, Inline, Stack } from "@mobily/stacks"
import { Button, Icon, Image, Text } from "@rneui/themed"
import { useRef, useState } from "react"
import {StyleSheet, TouchableOpacity, View } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { Switch, TextInput } from "react-native-paper"
import API from "../api"
import CategoryBottomSheet from "../compoments/BottomSheet/CategoryBottomSheet"
import RBSheet from "react-native-raw-bottom-sheet"

interface CommunityRequest{
    name?: string;
    profile?: string;
    bio?: string;
    category?: string[];
}

const CreateCommunityScreen = () =>{
    const rbRef = useRef<RBSheet>(null)
    const [isTouchOpen, setIsTouchOpen] = useState(false)
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [photo, setPhoto] = useState('')
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const onTouchClose = () => setIsTouchOpen(!isTouchOpen)
    const [communityData, setCommunityData] = useState<CommunityRequest>()

    const openGallery = async () =>{
        const data = await launchImageLibrary({
                includeBase64: true,
                mediaType: "photo"
            }).then((e : any) => 
                e.assets!.map((item: any, index: string | number)=>{
                    setPhoto(e.assets[index].uri)
                    setCommunityData(prev => ({...prev, profile: e.assets[index].base64}))
                })
            )
        }

    const onCreate = () =>{
        API.CreateCommunity({
            name: communityData?.name,
            bio: communityData?.bio,
            profile: communityData?.profile,
            category: communityData?.category
        }).then(res => res.json()).then(()=> {

        })
    }
    return(
            <Stack space={4} style={styles.container}>
                <Columns alignY={'center'} alignX={'between'}>
                    <Column width={"1/4"}>
                        {photo != '' ? <Image source={{uri: photo}} style={{width: 90, height: 90, borderRadius: 45}}/> : <Image source={require('./../assets/images/community_blank_logo.png')} style={{width: 90, height: 90, borderRadius: 45}}/>}
                    </Column>
                    <Inline alignY={'center'} alignX={"evenly"}>
                        <Button
                            title="Upload an image"
                            size="sm"
                            buttonStyle={{backgroundColor: "#398fec"}}
                            onPress={()=> openGallery()}/>
                        <TouchableOpacity onPress={()=> [setPhoto(''), setCommunityData(prev => ({...prev, profile: ''}))]}>
                            <Text style={{color: 'red'}}>Clear image</Text>
                        </TouchableOpacity>
                    </Inline>               
                </Columns>
                <Text style={{fontWeight: "700"}}>Community name</Text>
                <TextInput mode="outlined" 
                        placeholder="Please input community name" 
                        label={"Community_name"} 
                        maxLength={21}
                        />
                <Inline alignX={"between"} alignY={'center'}>
                    <Text style={{fontWeight: "700"}}>Community bio</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Inline>
                {isSwitchOn ? (
                    <TextInput mode="outlined"
                            multiline 
                            placeholder="Please input age" 
                            label={"Bio"}/>
                ): null}
                <TouchableOpacity onPress={()=> rbRef.current?.open()}>
                    <Text style={{fontWeight: "700", color: '#398fec'}}>Community category</Text>
                </TouchableOpacity>
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
                    onPress={()=> onCreate()}
                />
                <CategoryBottomSheet rbRef={rbRef} backPress={()=> rbRef.current?.close()}/>               
            </Stack>
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




{/* <TouchableOpacity onPress={()=> setIsTouchOpen(true)}>
    <Stack space={2}>
        <Inline alignY={'center'} space={1}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Public</Text>
            <Icon name="caret-down" type="ionicon" size={20} style={{opacity: 0.5}}/>
        </Inline>
        <Text>Anyone can view, upvote, and comment to this community</Text>
    </Stack>
</TouchableOpacity> */}